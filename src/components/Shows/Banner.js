import React from 'react';
import { Image, Text } from '@geist-ui/react';
import { Link } from 'react-router-dom';

import makeStyles from '../../util/makeStyles';
import { getBackdropPath, getPosterPath } from '../../util/show';

import Content from '../util/Content';
import Ribbon from './DataRibbon';

const useStyles = makeStyles((ui) => ({
    backdrop: {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        color: '#ffffff',
        backgroundColor: ui.type === 'dark' ? '#000000' : '#666666',
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContent: {
        display: 'none',
    },
    '@media screen and (min-width: 900px)': {
        textContent: {
            display: 'block',
            marginLeft: '32px',
        },
    },
}));

export const LargeBanner = ({
    backdrop,
    poster,
    genres,
    overview,
    tagline,
    title,
    releaseDate,
    runtime,
    rating,
}) => {
    const classes = useStyles();
    const backdropClasses = makeStyles((ui) => ({
        largeBackdrop: {
            height: '300px',
        },
        dot: {
            marginLeft: '8px',
        },
        metadata: {
            marginBottom: '0.625rem',
        },
        poster: {
            height: '225px !important',
            width: '150px !important',
        },
        '@media screen and (min-width: 900px)': {
            largeBackdrop: {
                height: '600px',
            },
            poster: {
                height: '450px !important',
                width: '300px !important',
            },
        },
    }))();

    const backdropPath = getBackdropPath(backdrop);
    const posterPath = getPosterPath(poster, 300);

    return (
        <div
            className={`${classes.backdrop} ${backdropClasses.largeBackdrop}`}
            style={{ backgroundImage: backdropPath }}
        >
            <Content className={classes.content}>
                <div>
                    <Image
                        src={posterPath}
                        alt={title}
                        className={backdropClasses.poster}
                    />
                </div>
                <div className={classes.textContent}>
                    <Text h1>{title}</Text>
                    <Ribbon
                        rating={rating}
                        releaseDate={releaseDate}
                        genres={genres}
                        runtime={runtime}
                    />
                    {tagline && (
                        <Text h3 i>
                            {tagline}
                        </Text>
                    )}
                    {overview && <Text p>{overview}</Text>}
                </div>
            </Content>
        </div>
    );
};

export const MiniBanner = ({ title, backdrop, poster, link, linkText }) => {
    const classes = useStyles();
    const { miniBackdrop, noMargin, heading } = makeStyles((ui) => ({
        miniBackdrop: {
            height: '325px',
        },
        noMargin: {
            margin: '0 !important',
        },
        heading: {
            marginBottom: '0',
        },
    }))();

    const backdropPath = backdrop
        ? `url("https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,000000,555555)${backdrop}")`
        : '';

    const posterPath = poster
        ? `https://image.tmdb.org/t/p/w300${poster}`
        : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';

    return (
        <section
            className={`${classes.backdrop} ${miniBackdrop}`}
            style={{ backgroundImage: backdropPath }}
        >
            <Content className={classes.content}>
                <div>
                    <Link to={link}>
                        <Image
                            height={231}
                            width={154}
                            src={posterPath}
                            className={noMargin}
                            alt={title}
                        />
                    </Link>
                </div>
                <div className={classes.textContent}>
                    <Text h2 className={heading}>
                        {title}
                    </Text>
                    <Text p className={noMargin}>
                        <Link to={link}>{linkText}</Link>
                    </Text>
                </div>
            </Content>
        </section>
    );
};
