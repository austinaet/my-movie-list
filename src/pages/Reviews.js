import React from 'react';
import { Text, Spacer } from '@geist-ui/react';
import { useParams } from 'react-router-dom';

import { caller, query } from '../util/axios';
import errorHandler from '../util/errorHandler';

import Content from '../components/util/Content';
import Loading from '../components/util/Loading';
import ErrorPage from '../components/util/Error';
import { Review } from '../components/Shows/Reviews';
import Pagination from '../components/util/Pagination';
import { MiniBanner } from '../components/Shows/Banner';

const ReviewsPage = (props) => {
    const { type, id } = useParams();

    const [loadingBackdrop, setLoadingBackdrop] = React.useState(true);
    const [loadingReviews, setLoadingReviews] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState();
    const [details, setDetails] = React.useState();
    const [reviews, setReviews] = React.useState();

    React.useEffect(() => {
        const getDetails = async (type, id) => {
            setLoadingBackdrop(true);
            try {
                const detailsResponse = await caller.get(
                    `/3/${type}/${id}?api_key=${query.api_key}&language=${query.language}`
                );
                setDetails(detailsResponse.data);
                document.title = `${
                    detailsResponse.data.title || detailsResponse.data.name
                } reviews`;
            } catch (error) {
                setError(errorHandler(error));
                setLoading(false);
            }
            setLoadingBackdrop(false);
        };

        if (typeof +id !== 'number' || +id === 0) {
            setError({
                code: 400,
                message: 'Show ID missing from request URL',
            });
            setLoading(false);
        } else if (type !== 'movie' && type !== 'tv') {
            setError({
                code: 400,
                message: 'Invalid request URL',
            });
            console.log(type, id);
            setLoading(false);
        } else {
            getDetails(type, id);
        }

        return () => document.title = 'My Movie List';
    }, [type, id]);

    const getReviews = React.useCallback(
        async (page) => {
            setLoadingReviews(true);
            try {
                const reviewsResponse = await caller.get(
                    `/3/${type}/${id}/reviews?api_key=${query.api_key}&language=${query.language}&page=${page}`
                );
                setReviews(reviewsResponse.data);
            } catch (error) {
                setError(errorHandler(error));
                setLoading(false);
            }
            setLoadingReviews(false);
        },
        [type, id]
    );

    React.useEffect(() => {
        getReviews(1);
    }, [getReviews]);

    React.useEffect(() => {
        if (!loadingBackdrop && !loadingReviews) {
            setLoading(false);
        }
    }, [loadingBackdrop, loadingReviews]);

    return (
        <>
            {loading && <Loading text="Loading reviews..." />}
            {!loading && error && <ErrorPage error={error} setTitle />}
            {!loading && !error && (
                <>
                    <MiniBanner
                        title={`Reviews of ${
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
                        {reviews.results.length > 0 ? (
                            <>
                                {reviews.results.map((review) => (
                                    <article key={review.id}>
                                        <Review
                                            review={review}
                                            previewLength={500}
                                        />
                                        <Spacer y={0.8} />
                                    </article>
                                ))}
                                {reviews.total_pages > 1 && (
                                    <Pagination
                                        count={reviews.total_pages}
                                        page={1}
                                        initialPage={1}
                                        onChange={getReviews}
                                    />
                                )}
                            </>
                        ) : (
                            <Text h2 style={{ textAlign: 'center' }}>
                                No reviews available for this title
                            </Text>
                        )}
                    </Content>
                </>
            )}
        </>
    );
};

export default ReviewsPage;
