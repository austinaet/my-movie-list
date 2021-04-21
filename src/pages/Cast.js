import React from 'react';
import { useParams } from 'react-router-dom';
import { Collapse, Spacer } from '@geist-ui/react';

import { caller, query } from '../util/axios';
import errorHandler from '../util/errorHandler';
import makeStyles from '../util/makeStyles';
import { transformCast, transformCrew } from '../util/transformResponse';

import Loading from '../components/util/Loading';
import ErrorPage from '../components/util/Error';
import Content from '../components/util/Content';
import Card from '../components/Shows/ActorCard';
import { MiniBanner } from '../components/Shows/Banner';

const useStyles = makeStyles((ui) => ({
    collapseGroup: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'stretch',
    },
}));

const Cast = (props) => {
    const { type, id } = useParams();
    const { collapseGroup } = useStyles();

    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState();
    const [details, setDetails] = React.useState();
    const [cast, setCast] = React.useState();
    const [crew, setCrew] = React.useState();

    React.useEffect(() => {
        const getCastCrew = async (type, id) => {
            document.title = 'Cast & Crew';
            try {
                const [castCrewResponse, detailsResponse] = await Promise.all([
                    caller.get(
                        `/3/${type}/${id}/credits?api_key=${query.api_key}&language=${query.language}`
                    ),
                    caller.get(
                        `/3/${type}/${id}?api_key=${query.api_key}&language=${query.language}`
                    ),
                ]);
                setDetails(detailsResponse.data);
                setCast(transformCast(castCrewResponse.data.cast));
                setCrew(transformCrew(castCrewResponse.data.crew));
            } catch (error) {
                setError(errorHandler(error));
            }
            setLoading(false);
        };

        setLoading(true);
        if (type !== 'movie' && type !== 'tv') {
            setError({
                code: 404,
                message: 'The resource you requested could not be found',
            });
            setLoading(false);
        } else if (typeof +id !== 'number' || +id === 0) {
            setError({
                code: 400,
                message: 'Show ID missing from request URL',
            });
            setLoading(false);
        } else {
            getCastCrew(type, id);
        }

        return () => (document.title = 'My Movie List');
    }, [type, id]);

    return (
        <>
            {loading && <Loading text="Loading cast &amp; crew" />}
            {!loading && error && <ErrorPage error={error} setTitle />}
            {!loading && !error && (
                <>
                    <MiniBanner
                        title={`Cast & Crew of ${
                            type === 'movie' ? details.title : details.name
                        }`}
                        backdrop={details.backdrop_path}
                        poster={details.poster_path}
                        link={`/${type}/${id}`}
                        linkText={`Go to ${
                            type === 'movie' ? 'movie' : 'TV show'
                        } page`}
                    />
                    <Content>
                        <Spacer y={0.8} />
                        <Collapse.Group>
                            {cast && (
                                <Collapse title="Cast" subtitle={cast.length}>
                                    <section className={collapseGroup}>
                                        {cast.map((act) => (
                                            <Card
                                                key={Math.random() * act.id}
                                                {...act}
                                            />
                                        ))}
                                    </section>
                                </Collapse>
                            )}
                            {crew &&
                                Object.keys(crew).map((department) => (
                                    <Collapse
                                        title={department}
                                        subtitle={crew[department].length}
                                        key={department}
                                    >
                                        <section className={collapseGroup}>
                                            {crew[department].map((member) => (
                                                <Card
                                                    key={
                                                        Math.random() *
                                                        member.id
                                                    }
                                                    {...member}
                                                />
                                            ))}
                                        </section>
                                    </Collapse>
                                ))}
                        </Collapse.Group>
                        <Spacer y={0.8} />
                    </Content>
                </>
            )}
        </>
    );
};

export default Cast;
