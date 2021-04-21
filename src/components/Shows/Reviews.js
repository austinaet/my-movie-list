import React from 'react';
import { Text, Card, User, Spacer, Link, Tag } from '@geist-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import checkURL from '../../util/URL';
import convertDate from '../../util/convertDate';
import makeStyles from '../../util/makeStyles';

const useStyles = makeStyles((ui) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    content: {
        whiteSpace: 'pre-line',
    },
    '@media screen and (min-width: 900px)': {
        container: {
            justifyContent: 'start',
        },
    },
    link: {
        color: ui.palette.success,
        transition: 'color 0.2s',
        '&:hover': {
            color: ui.type === 'dark' ? ui.palette.successLight : ui.palette.successDark,
        },
    },
}));

export const Review = ({ review, previewLength = 250 }) => {
    const classes = useStyles();

    const reviewDate = convertDate(review.created_at.split('T')[0]);

    let avatarPath;
    if (!review.author_details.avatar_path) {
        avatarPath =
            'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
    } else {
        avatarPath = review.author_details.avatar_path;
        if (avatarPath.charAt(0) === '/') {
            avatarPath = avatarPath.substring(1);
        }
        const isURL = checkURL(avatarPath);
        avatarPath = isURL
            ? avatarPath
            : 'https://image.tmdb.org/t/p/w45/' + avatarPath;
    }

    let isShortReview, shortReview;
    if (review.content.length > previewLength) {
        isShortReview = false;
        shortReview =
            review.content.substring(0, previewLength - 3).trim() + '...';
    } else {
        isShortReview = true;
        shortReview = review.content;
    }

    let tagType;
    if (review.author_details.rating) {
        if (review.author_details.rating <= 2.5) {
            tagType = 'error';
        } else if (review.author_details.rating <= 5) {
            tagType = 'warning';
        } else if (review.author_details.rating <= 7.5) {
            tagType = 'success';
        } else {
            tagType = 'default';
        }
    } else {
        tagType = 'secondary';
    }

    return (
        <Card shadow>
            <div className={classes.container}>
                <User
                    src={avatarPath}
                    name={review.author_details.name || review.author}
                >
                    {reviewDate}
                </User>
                <Spacer x={0.5} />
                <Tag type={tagType} invert>
                    {review.author_details.rating
                        ? `${review.author_details.rating}/10`
                        : 'N/A'}
                </Tag>
            </div>
            <Text p className={classes.content}>
                {shortReview}
            </Text>
            {isShortReview ? null : (
                <Link
                    href={review.url}
                    icon
                    color
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.link}
                >
                    Read full review
                </Link>
            )}
        </Card>
    );
};

export const Reviews = ({ type, id, reviews }) => {
    const { link } = useStyles();

    let jsxData;

    if (reviews.total_results === 0) {
        jsxData = (
            <Text p>
                There are no reviews available for this{' '}
                {type === 'movie' ? 'movie' : 'TV show'}
            </Text>
        );
    } else {
        const reviewCount =
            reviews.total_results > 20 ? 20 : reviews.total_results;
        const randomReview = Math.floor(Math.random() * reviewCount);
        const review = reviews.results[randomReview];
        jsxData = (
            <>
                <Review review={review} />
                <Text p>
                    <RouterLink to={`/${type}/${id}/reviews`} className={link}>
                        Read all reviews
                    </RouterLink>
                </Text>
            </>
        );
    }

    return (
        <>
            <Text h3>Reviews</Text>
            {jsxData}
        </>
    );
};
