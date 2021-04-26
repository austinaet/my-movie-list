import React from 'react';
import { Card, Divider, Text, Spacer } from '@geist-ui/react';
import { Link } from 'react-router-dom';

import makeStyles from '../../util/makeStyles';

const useStyles = makeStyles((ui) => ({
    secondaryText: {
        color: ui.palette.secondary,
    },
    paragraph: {
        margin: '0 !important',
    },
    link: {
        color: ui.palette.success,
        transition: 'color 0.2s',
        '&:hover': {
            color:
                ui.type === 'dark'
                    ? ui.palette.successLight
                    : ui.palette.successDark,
        },
    },
}));

const getReleaseYear = (date) => (date ? +date.split('-')[0] : '');

const transformCast = (cast) => {
    if (cast.length === 0) {
        return [];
    }
    const newCast = cast.map((act) => {
        let newAct = {
            id: act.id,
            title: act.title || act.name,
            releaseYear: getReleaseYear(
                act.media_type === 'movie'
                    ? act.release_date
                    : act.first_air_date
            ),
            character: act.character,
            mediaType: act.media_type,
        };
        if (act.media_type === 'tv') {
            newAct.episodes = act.episode_count;
        }
        return newAct;
    });
    return newCast.sort((a, b) => {
        if (!a.releaseYear) {
            return -100;
        }
        if (!b.releaseYear) {
            return 100;
        }
        return b.releaseYear - a.releaseYear;
    });
};

const Cast = ({ cast }) => {
    const classes = useStyles();

    if (cast.length === 0) {
        return null;
    }

    const newCast = transformCast(cast);
    let year = newCast[0].releaseYear;

    return (
        <>
            <Text h3>Acting</Text>
            <Card shadow>
                {newCast.map((act) => {
                    let isDividerRequired = false;
                    if (year !== act.releaseYear) {
                        isDividerRequired = true;
                        year = act.releaseYear;
                    }
                    return (
                        <div key={act.id * Math.random()}>
                            {isDividerRequired && <Divider />}
                            <Text className={classes.paragraph}>
                                <span>{act.releaseYear || '--------'}</span>
                                <Spacer x={0.8} inline />
                                <Link
                                    to={`/${act.mediaType}/${act.id}`}
                                    className={classes.link}
                                >
                                    {act.title}
                                </Link>
                                {act.mediaType === 'tv' && act.episodes && (
                                    <>
                                        {' '}
                                        <span className={classes.secondaryText}>
                                            ({act.episodes} episode
                                            {act.episodes > 1 && 's'}){' '}
                                        </span>
                                    </>
                                )}
                                {act.character && (
                                    <>
                                        {' '}
                                        <span className={classes.secondaryText}>
                                            as
                                        </span>{' '}
                                        <span>{act.character}</span>
                                    </>
                                )}
                            </Text>
                        </div>
                    );
                })}
            </Card>
        </>
    );
};

export default Cast;
