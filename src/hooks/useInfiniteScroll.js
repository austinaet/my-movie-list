import { useState, useEffect } from 'react';
import axios from 'axios';

import { query } from '../util/axios';
import errorHandler from '../util/errorHandler';

const useInfiniteScroll = (showType, pageType, pageNumber) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [results, setResults] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setResults([]);
    }, [showType, pageType]);

    useEffect(() => {
        setLoading(true);
        setError(null);
        axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/${showType}/${pageType}`,
            params: {
                api_key: query.api_key,
                language: query.language,
                page: pageNumber,
            },
        })
            .then((response) => {
                if (showType === 'movie') {
                    setResults((prevResults) => [
                        ...prevResults,
                        ...response.data.results.map((movie) => ({
                            id: movie.id,
                            title: movie.title,
                            rating: movie.vote_average,
                            poster: movie.poster_path
                                ? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
                                : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg',
                            releaseDate: movie.release_date
                        })),
                    ]);
                } else if (showType === 'tv') {
                    setResults((prevResults) => [
                        ...prevResults,
                        ...response.data.results.map((tv) => ({
                            id: tv.id,
                            name: tv.name,
                            rating: tv.vote_average,
                            poster: tv.poster_path
                                ? `https://image.tmdb.org/t/p/w154${tv.poster_path}`
                                : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg',
                            airDate: tv.first_air_date
                        })),
                    ]);
                } else {
                    setResults((prevResults) => [
                        ...prevResults,
                        ...response.data.results.map((person) => ({
                            id: person.id,
                            name: person.name,
                            imagePath: person.profile_path
                                ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                                : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg',
                            knownFor: person.known_for
                                .map((show) => show.title || show.name)
                                .join(', '),
                        })),
                    ]);
                }
                setHasMore(!(pageNumber === 1000));
                setLoading(false);
            })
            .catch((e) => {
                setError(errorHandler(e));
            });
    }, [showType, pageType, pageNumber]);

    return { loading, error, results, hasMore };
};

export default useInfiniteScroll;
