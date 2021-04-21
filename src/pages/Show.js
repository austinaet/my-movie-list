import React from 'react';
import { Divider, Spacer, Text, Grid } from '@geist-ui/react';
import { useParams, Link } from 'react-router-dom';

import { caller, query } from '../util/axios';
import errorHandler from '../util/errorHandler';
import makeStyles from '../util/makeStyles';

import Content from '../components/util/Content';
import Loading from '../components/util/Loading';
import ErrorPage from '../components/util/Error';
import { Reviews } from '../components/Shows/Reviews';
import { LargeBanner } from '../components/Shows/Banner';
import Info from '../components/Shows/Info';
import CastSlider from '../components/Shows/CastSlider';
import Recommendations from '../components/Shows/Recommendations';
import Season from '../components/Shows/SOE';
import ExternalLinks from '../components/Shared/ExternalLinks';
import Metadata from '../components/Shared/Metadata';

const useStyles = makeStyles((ui) => ({
    metadata: {
        padding: '16px !important',
    },
    info: {
        display: 'block',
    },
    '@media screen and (min-width: 900px)': {
        info: {
            display: 'hidden',
        },
    },
}));

const calcAverage = (values) => {
    if (values && values.length && values.length > 0) {
        return Math.floor(
            values.reduce((acc, cur) => acc + cur, 0) / values.length
        );
    }
    return undefined;
};

const Movie = (props) => {
    const { type, id } = useParams();
    const classes = useStyles();

    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState();
    const [details, setDetails] = React.useState();
    const [cast, setCast] = React.useState();
    const [externalIds, setExternalIds] = React.useState();
    const [reviews, setReviews] = React.useState();
    const [recommendations, setRecommendations] = React.useState();
    const [lastSeason, setLastSeason] = React.useState(null);

    React.useEffect(() => {
        const getDetails = async (type, id) => {
            try {
                const [
                    detailsResponse,
                    castResponse,
                    externalIdsResponse,
                    reviwesResponse,
                    recommendationsResponse,
                ] = await Promise.all([
                    caller.get(
                        `/3/${type}/${id}?api_key=${query.api_key}&language=${query.language}`
                    ),
                    caller.get(
                        `/3/${type}/${id}/credits?api_key=${query.api_key}&language=${query.language}`
                    ),
                    caller.get(
                        `/3/${type}/${id}/external_ids?api_key=${query.api_key}&language=${query.language}`
                    ),
                    caller.get(
                        `/3/${type}/${id}/reviews?api_key=${query.api_key}&language=${query.language}&page=1`
                    ),
                    caller.get(
                        `/3/${type}/${id}/recommendations?api_key=${query.api_key}&language=${query.language}&page=1`
                    ),
                ]);
                setDetails(detailsResponse.data);
                if (
                    detailsResponse.data.seasons &&
                    detailsResponse.data.seasons.length > 0
                ) {
                    setLastSeason(
                        detailsResponse.data.seasons[
                            detailsResponse.data.seasons.length - 1
                        ]
                    );
                }
                setCast(castResponse.data.cast);
                setExternalIds(externalIdsResponse.data);
                setReviews(reviwesResponse.data);
                setRecommendations(recommendationsResponse.data);
                document.title =
                    type === 'movie'
                        ? detailsResponse.data.title
                        : detailsResponse.data.name;
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
            getDetails(type, id);
        }

        return () => (document.title = 'My Movie List');
    }, [type, id]);

    return (
        <>
            {loading && <Loading text="Fetching details..." />}
            {!loading && error && <ErrorPage error={error} setTitle />}
            {!loading && !error && (
                <>
                    <LargeBanner
                        backdrop={details.backdrop_path}
                        poster={details.poster_path}
                        genres={details.genres}
                        overview={details.overview}
                        tagline={details.tagline}
                        title={type === 'movie' ? details.title : details.name}
                        releaseDate={
                            type === 'movie'
                                ? details.release_date
                                : details.first_air_date
                        }
                        runtime={
                            type === 'movie'
                                ? details.runtime
                                : calcAverage(details.episode_run_time)
                        }
                        rating={details.vote_average}
                    />
                    <Content>
                        <Info
                            genres={details.genres}
                            overview={details.overview}
                            tagline={details.tagline}
                            title={
                                type === 'movie' ? details.title : details.name
                            }
                            releaseDate={
                                type === 'movie'
                                    ? details.release_date
                                    : details.first_air_date
                            }
                            runtime={
                                type === 'movie'
                                    ? details.runtime
                                    : calcAverage(details.episode_run_time)
                            }
                            rating={details.vote_average}
                        />
                        <Spacer y={0.8} />
                        <Grid.Container gap={0.8}>
                            <Grid xs={24} sm={24} md={19} lg={19} xl={19}>
                                <CastSlider type={type} cast={cast} id={id} />
                                <Divider />
                                <Reviews
                                    type={type}
                                    id={id}
                                    reviews={reviews}
                                />
                                {lastSeason && (
                                    <>
                                        <Divider />
                                        <Text h3>
                                            {details.status === 'Ended'
                                                ? 'Last'
                                                : 'Latest'}{' '}
                                            Season
                                        </Text>
                                        <Season
                                            tvId={id}
                                            type="season"
                                            name={details.name}
                                            num={lastSeason.season_number}
                                            airDate={lastSeason.air_date}
                                            title={lastSeason.name}
                                            episodes={lastSeason.episode_count}
                                            overview={lastSeason.overview}
                                            poster={lastSeason.poster_path}
                                            link={`/tv/${id}/season/${lastSeason.season_number}`}
                                            shrinkOverview
                                        />
                                        <Text p>
                                            <Link to={`/tv/${id}/seasons`}>
                                                View all seasons
                                            </Link>
                                        </Text>
                                    </>
                                )}
                                <Divider />
                                <Recommendations
                                    type={type}
                                    recommendations={recommendations}
                                />
                            </Grid>
                            <Grid
                                xs={24}
                                sm={24}
                                md={5}
                                lg={5}
                                xl={5}
                                className={classes.metadata}
                            >
                                <ExternalLinks
                                    type={type}
                                    externalIds={{
                                        ...externalIds,
                                        homepage: details.homepage,
                                    }}
                                />
                                <Metadata
                                    type={type}
                                    data={{
                                        originalTitle:
                                            type === 'movie'
                                                ? details.original_title
                                                : details.original_name,
                                        status: details.status,
                                        language: details.original_language,
                                        budget: details.budget,
                                        revenue: details.revenue,
                                        networks: details.networks,
                                        type: details.type,
                                    }}
                                />
                            </Grid>
                        </Grid.Container>
                        <Spacer y={0.8} />
                    </Content>
                </>
            )}
        </>
    );
};

export default Movie;
