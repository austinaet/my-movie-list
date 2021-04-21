import React from 'react';
import { useLocation } from 'react-router-dom';
import { Text, Spacer, Loading } from '@geist-ui/react';

import useInfiniteScroll from '../hooks/useInfiniteScroll';
import makeStyles from '../util/makeStyles';

import Content from '../components/util/Content';
import ErrorPage from '../components/util/Error';
import ShowCard from '../components/Shows/ShowCard';
import ActorCard from '../components/Shows/ActorCard';

const useStyles = makeStyles((ui) => ({
    centerText: {
        textAlign: 'center',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'stretch',
        justifyContent: 'space-evenly',
    },
}));

const Today = (props) => {
    const { pathname } = useLocation();
    const path = pathname.split('/');

    /* pathname looks like '/today/:showType/:pageType'. So, we have to
    pass elements path[2] and path[3] to the useInfiniteScroll hook. This
    approach is to ensure that the component unmounts and mounts again
    when the route changes. */

    const classes = useStyles();

    const [pageNumber, setPageNumber] = React.useState(1);
    const [pageTitle, setPageTitle] = React.useState('');

    const { loading, error, results, hasMore } = useInfiniteScroll(
        path[2],
        path[3],
        pageNumber
    );

    React.useEffect(() => {
        const pageTitles = {
            movie: {
                now_playing: 'Movies Playing Now',
                popular: 'Popular Movies',
                top_rated: 'Top Rated Movies',
                upcoming: 'Upcoming Movies',
            },
            tv: {
                airing_today: 'Shows Airing Today',
                on_the_air: 'Shows On Air',
                popular: 'Popular Shows',
                top_rated: 'Top Rated Shows',
            },
            person: {
                popular: 'Popular People',
            },
        };
        setPageTitle(pageTitles[path[2]][path[3]]);
        document.title = pageTitles[path[2]][path[3]];
    }, [path]);

    const observer = React.useRef();
    const lastElementRef = React.useCallback(
        (node) => {
            if (loading) {
                return;
            }
            if (observer.current) {
                observer.current.disconnect();
            }

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPageNumber((prevPageNumber) => prevPageNumber + 1);
                }
            });
            if (node) {
                observer.current.observe(node);
            }
        },
        [loading, hasMore]
    );

    return (
        <>
            {error && <ErrorPage error={error} setTitle />}
            {!error && (
                <Content>
                    <Spacer y={0.8} />
                    <Text h1 className={classes.centerText}>
                        {pageTitle || 'Today'}
                    </Text>
                    <div className={classes.container}>
                        {results.map(
                            (
                                {
                                    id,
                                    title,
                                    name,
                                    rating,
                                    poster,
                                    imagePath,
                                    releaseDate,
                                    airDate,
                                    knownFor,
                                },
                                index
                            ) => {
                                if (path[2] === 'person') {
                                    if (results.length === index + 1) {
                                        const LastCard = React.forwardRef(
                                            (props, ref) => (
                                                <ActorCard
                                                    {...props}
                                                    innerRef={lastElementRef}
                                                />
                                            )
                                        );
                                        return (
                                            <LastCard
                                                key={id}
                                                id={id}
                                                name={name}
                                                role={knownFor}
                                                imagePath={imagePath}
                                            />
                                        );
                                    }
                                    return (
                                        <ActorCard
                                            key={id}
                                            id={id}
                                            name={name}
                                            role={knownFor}
                                            imagePath={imagePath}
                                        />
                                    );
                                } else {
                                    if (results.length === index + 1) {
                                        const LastCard = React.forwardRef(
                                            (props, ref) => (
                                                <ShowCard
                                                    {...props}
                                                    innerRef={lastElementRef}
                                                />
                                            )
                                        );
                                        return (
                                            <LastCard
                                                key={id * Math.random()}
                                                id={id}
                                                showType={path[2]}
                                                title={title || name}
                                                rating={rating}
                                                poster={poster}
                                                releaseDate={releaseDate || airDate}
                                                ref={lastElementRef}
                                            />
                                        );
                                    }
                                    return (
                                        <ShowCard
                                            key={id * Math.random()}
                                            id={id}
                                            showType={path[2]}
                                            title={title || name}
                                            rating={rating}
                                            poster={poster}
                                            releaseDate={releaseDate || airDate}
                                        />
                                    );
                                }
                            }
                        )}
                    </div>
                    {loading && <Loading />}
                    <Spacer y={0.8} />
                </Content>
            )}
        </>
    );
};

export default Today;
