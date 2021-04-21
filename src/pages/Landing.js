import React, { useEffect } from 'react';
import { Text, Tooltip, Image, Spacer } from '@geist-ui/react';
import { Link } from 'react-router-dom';

import { caller, query } from '../util/axios';
import makeStyles from '../util/makeStyles';
import errorHandler from '../util/errorHandler';

import Content from '../components/util/Content';
import Loading from '../components/util/Loading';
import ErrorPage from '../components/util/Error';
import Scroller from '../components/util/Scroller';

const useStyles = makeStyles((ui) => ({
    banner: {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '400px',
        backgroundColor: ui.type === 'dark' ? '#000000' : '#666666',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bannerText: {
        textAlign: 'center',
        color: '#ffffff',
    },
    search: {
        margin: '0 auto',
        position: 'relative',
        top: '-130px',
        width: '90%',
    },
    [`@media screen and (min-width: 542px)`]: {
        search: {
            width: '500px',
        },
    },
    '@media screen and (min-width: 410px)': {
        bannerText: {
            top: '80px',
        },
        search: {
            top: '-160px',
        },
    },
}));

const Banner = ({ image }) => {
    const classes = useStyles();
    return (
        <section
            style={{
                backgroundImage: `url("${image}")`,
            }}
            className={classes.banner}
        >
            <div className={classes.bannerText}>
                <Text h2>Welcome to MyMovieList</Text>
                <Text h3>
                    Get details of all your favourite movies
                    and TV shows. All in one place.
                </Text>
            </div>
        </section>
    );
};

const Slider = ({ data, type }) => {
    return (
        <Scroller>
            {data.results.map(({ id, title, name, poster_path: image }) => (
                <article key={id} style={{ marginRight: '8px' }}>
                    <Tooltip
                        text={type === 'movie' ? title : name}
                        offset={8}
                        hideArrow
                    >
                        <Link to={`/${type}/${id}`}>
                            <Image
                                width={185}
                                height={278}
                                src={`https://image.tmdb.org/t/p/w185${image}`}
                                alt={type === 'movie' ? title : name}
                            />
                        </Link>
                    </Tooltip>
                </article>
            ))}
        </Scroller>
    );
};

const Landing = (props) => {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState();
    const [playing, setPlaying] = React.useState();
    const [onAir, setOnAir] = React.useState();
    const [popularMovies, setPopularMovies] = React.useState();
    const [popularShows, setPopularShows] = React.useState();
    const [backdrop, setBackdrop] = React.useState();

    useEffect(() => {
        const getLanding = async () => {
            setLoading(true);
            document.title = 'My Movie List';
            try {
                const [
                    playingResponse,
                    onAirResponse,
                    popularMoviesResponse,
                    popularShowsResponse,
                ] = await Promise.all([
                    caller.get(
                        `/3/movie/now_playing?api_key=${query.api_key}&language=${query.language}&page=1`
                    ),
                    caller.get(
                        `/3/tv/on_the_air?api_key=${query.api_key}&language=${query.language}&page=1`
                    ),
                    caller.get(
                        `/3/movie/popular?api_key=${query.api_key}&language=${query.language}&page=1`
                    ),
                    caller.get(
                        `/3/tv/popular?api_key=${query.api_key}&language=${query.language}&page=1`
                    ),
                ]);
                setPlaying(playingResponse.data);
                setOnAir(onAirResponse.data);
                setPopularMovies(popularMoviesResponse.data);
                setPopularShows(popularShowsResponse.data);
                let foundBackdrop = false,
                    counter = 0;
                const resultsCount = popularMoviesResponse.data.results.length;
                while (!foundBackdrop && counter < resultsCount) {
                    const randomIndex = Math.floor(
                        Math.random() * resultsCount
                    );
                    if (
                        popularMoviesResponse.data.results[randomIndex]
                            .backdrop_path
                    ) {
                        setBackdrop(
                            `https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,000000,555555)${popularMoviesResponse.data.results[randomIndex].backdrop_path}`
                        );
                        foundBackdrop = true;
                    }
                    counter++;
                }
                if (counter === resultsCount) {
                    setBackdrop(
                        'https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,000000,555555)/cifs43XOpsUYUgEDzcsU52AvcaP.jpg'
                    );
                }
            } catch (error) {
                setError(errorHandler(error));
            }
            setLoading(false);
        };
        getLanding();

        return () => document.title = 'My Movie List';
    }, []);

    return (
        <>
            {loading && <Loading />}
            {!loading && error && <ErrorPage error={error} setTitle />}
            {!loading && !error && (
                <>
                    <Banner image={backdrop} />
                    <Content>
                        <Text h3>Now Playing</Text>
                        <Slider data={playing} type="movie" />
                        <Spacer y={0.8} />
                        <Text h3>Shows On Air</Text>
                        <Slider data={onAir} type="tv" />
                        <Spacer y={0.8} />
                        <Text h3>Popular Movies</Text>
                        <Slider data={popularMovies} type="movie" />
                        <Spacer y={0.8} />
                        <Text h3>Popular TV Shows</Text>
                        <Slider data={popularShows} type="tv" />
                        <Spacer y={0.8} />
                    </Content>
                </>
            )}
        </>
    );
};

export default Landing;
