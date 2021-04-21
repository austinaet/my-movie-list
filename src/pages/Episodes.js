import React from 'react';
import { useParams } from 'react-router-dom';
import { Spacer, Text } from '@geist-ui/react';

import errorHandler from '../util/errorHandler';
import { caller, query } from '../util/axios';

import Loading from '../components/util/Loading';
import ErrorPage from '../components/util/Error';
import Content from '../components/util/Content';
import { MiniBanner } from '../components/Shows/Banner';
import Episode from '../components/Shows/SOE';

const Season = (props) => {
    const { id, num } = useParams();

    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState();
    const [details, setDetails] = React.useState();
    const [season, setSeason] = React.useState();

    React.useEffect(() => {
        const getDetails = async (id, num) => {
            try {
                const [detailsResponse, seasonsResponse] = await Promise.all([
                    caller.get(
                        `/3/tv/${id}?api_key=${query.api_key}&language=${query.language}`
                    ),
                    caller.get(
                        `3/tv/${id}/season/${num}?api_key=${query.api_key}&language=${query.language}`
                    ),
                ]);
                setDetails(detailsResponse.data);
                setSeason(seasonsResponse.data);
            } catch (error) {
                setError(errorHandler(error));
            }
            setLoading(false);
        };
        if (typeof +id !== 'number' || typeof +num !== 'number') {
            setError({ code: 400, message: 'Error in request URL' });
        } else {
            getDetails(id, num);
        }

        return () => document.title = 'My Movie List';
    }, [id, num]);

    return (
        <>
            {loading && <Loading text="Loading episodes..." />}
            {!loading && error && <ErrorPage error={error} setTitle />}
            {!loading && !error && (
                <>
                    <MiniBanner
                        title={`Episodes of ${details.name} Season ${season.season_number}`}
                        backdrop={details.backdrop_path}
                        poster={details.poster_path}
                        link={`/tv/${id}/seasons`}
                        linkText={`Go to ${details.name} seasons`}
                    />
                    <Content>
                        <Spacer y={0.8} />
                        {season.episodes.length > 0 ? (
                            <>
                                {season.episodes.map((episode) => (
                                    <div key={episode.id}>
                                        <Episode
                                            type="episode"
                                            name={season.name}
                                            num={episode.episode_number}
                                            airDate={episode.air_date}
                                            title={episode.name}
                                            overview={episode.overview}
                                            poster={episode.still_path}
                                        />
                                        <Spacer y={0.8} />
                                    </div>
                                ))}
                            </>
                        ) : (
                            <Text h3>
                                No episodes available for this season
                            </Text>
                        )}
                    </Content>
                </>
            )}
        </>
    );
};

export default Season;
