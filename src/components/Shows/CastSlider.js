import React from 'react';
import { Text } from '@geist-ui/react';
import { Link } from 'react-router-dom';

import Scroller from '../util/Scroller';
import Card from './ActorCard';

import makeStyles from '../../util/makeStyles';
import { transformCast } from '../../util/transformResponse';

const useStyles = makeStyles((ui) => ({
    scrollbox: {
        height: '300px',
        width: '130px',
        minWidth: '130px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        wordBreak: 'keep-all',
    },
    link: {
        color: ui.palette.success,
        transition: 'color 0.2s',
        '&:hover': {
            color: ui.type === 'dark' ? ui.palette.successLight : ui.palette.successDark,
        },
    },
}));

const CastSlider = ({ type, id, cast }) => {
    const classes = useStyles();

    if (!cast || cast.length === 0) {
        return (
            <>
                <Text h3>Cast</Text>
                <Text p>
                    We don't have information about the cast of this{' '}
                    {type === 'movie' ? 'movie' : 'TV show'}
                </Text>
            </>
        );
    }

    cast = transformCast(cast);
    let truncated = false;
    if (cast.length > 9) {
        truncated = true;
        cast = cast.slice(0, 10);
    }
    return (
        <>
            <Text h3>Cast</Text>
            <Scroller>
                {cast.map((act) => (
                    <Card key={act.id} {...act} />
                ))}
                {truncated && (
                    <div className={classes.scrollbox}>
                        <Link to={`/${type}/${id}/cast`} className={classes.link}>View more</Link>
                    </div>
                )}
            </Scroller>
            <Text p>
                <Link to={`/${type}/${id}/cast`} className={classes.link}>Full cast &amp; crew</Link>
            </Text>
        </>
    );
};

export default CastSlider;
