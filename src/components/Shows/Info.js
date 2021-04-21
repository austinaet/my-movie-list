import React from 'react';
import { Text, Divider } from '@geist-ui/react';

import makeStyles from '../../util/makeStyles';

import Ribbon from './DataRibbon';

const useStyles = makeStyles((ui) => ({
    info: {
        display: 'block',
    },
    title: {
        marginBottom: '0',
        textAlign: 'center',
    },
    tagline: {
        textAlign: 'center',
    },
    ribbon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '24px',
    },
    '@media screen and (min-width: 900px)': {
        info: {
            display: 'none',
        },
    },
}));

const Info = ({
    genres,
    overview,
    tagline,
    title,
    releaseDate,
    runtime,
    rating,
}) => {
    const classes = useStyles();
    return (
        <div className={classes.info}>
            <Text h1 className={classes.title}>
                {title}
            </Text>
            {tagline && (
                <Text h3 i className={classes.tagline}>
                    {tagline}
                </Text>
            )}
            <div className={classes.ribbon}>
                <Ribbon
                    rating={rating}
                    releaseDate={releaseDate}
                    genres={genres}
                    runtime={runtime}
                />
            </div>
            {overview && <Text p>{overview}</Text>}
            <Divider />
        </div>
    );
};

export default Info;
