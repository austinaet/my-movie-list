import React from 'react';
import { Spacer, Text } from '@geist-ui/react';
import { useParams } from 'react-router-dom';

import errorHandler from '../util/errorHandler';
import { caller, query } from '../util/axios';

import Loading from '../components/util/Loading';
import ErrorPage from '../components/util/Error';
import Content from '../components/util/Content';
import { MiniBanner } from '../components/Shows/Banner';
import Season from '../components/Shows/SOE';

const Seasons = (props) => {
    const { id } = useParams();

    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState();
    const [details, setDetails] = React.useState();

    React.useEffect(() => {
        const getDetails = async (id) => {
            document.title = 'Loading...';
            try {
                const detailsResponse = await caller.get(
                    `/3/tv/${id}?api_key=${query.api_key}&language=${query.language}`
                );
                setDetails(detailsResponse.data);
                document.title = detailsResponse.data.name;
            } catch (error) {
                setError(errorHandler(error));
            }
            setLoading(false);
        };
        if (typeof +id !== 'number' || +id === 0) {
            setError({
                code: 400,
                message: 'Show ID missing from request URL',
            });
            setLoading(false);
        } else {
            getDetails(id);
        }

        return () => document.title = 'My Movie List';
    }, [id]);

    return (
        <>
            {loading && <Loading text="Loading seasons..." />}
            {!loading && error && <ErrorPage error={error} setTitle />}
            {!loading && !error && (
                <>
                    <MiniBanner
                        title={`Seasons list for ${details.name}`}
                        backdrop={details.backdrop_path}
                        poster={details.poster_path}
                        link={`/tv/${id}`}
                        linkText="Go to TV show page"
                    />
                    <Content>
                        <Spacer y={0.8} />
                        {details.seasons.length > 0 ? (
                            <>
                                {details.seasons.map((season) => (
                                    <div key={season.id}>
                                        <Season
                                            type="season"
                                            tvId={id}
                                            name={details.name}
                                            num={season.season_number}
                                            airDate={season.air_date}
                                            title={season.name}
                                            episodes={season.episode_count}
                                            overview={season.overview}
                                            poster={season.poster_path}
                                            link={`/tv/${id}/season/${season.season_number}`}
                                            showLink
                                        />
                                        <Spacer y={0.8} />
                                    </div>
                                ))}
                            </>
                        ) : (
                            <Text h3>No seasons available for this show</Text>
                        )}
                    </Content>
                </>
            )}
        </>
    );
};

export default Seasons;
