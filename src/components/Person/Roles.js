import React from 'react';
import { Text, Card, Divider, Spacer } from '@geist-ui/react';
import { Link } from 'react-router-dom';

import makeStyles from '../../util/makeStyles';

const useStyles = makeStyles((ui) => ({
    secondaryText: {
        color: ui.palette.secondary,
    },
    paragraph: {
        margin: '0 !important',
    },
    card: {
        marginBottom: '1rem !important'
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

const Roles = ({ department, roles }) => {
    const classes = useStyles();

    if (roles.length === 0) {
        return null;
    }

    let year = roles[0].releaseYear;

    return (
        <div data-testid="card">
            <Text h3>{department}</Text>
            <Card shadow className={classes.card}>
                {roles.map((role) => {
                    let isDividerRequired = false;
                    if (year !== role.releaseYear) {
                        isDividerRequired = true;
                        year = role.releaseYear;
                    }
                    return (
                        <div key={role.id * Math.random()}>
                            {isDividerRequired && (
                                <Divider data-testid="divider" />
                            )}
                            <Text className={classes.paragraph}>
                                <span data-testid="year">
                                    {role.releaseYear || '--------'}
                                </span>
                                <Spacer x={0.8} inline />
                                <Link
                                    to={`/${role.mediaType}/${role.id}`}
                                    className={classes.link}
                                    data-testid="name"
                                >
                                    {role.title}
                                </Link>
                                {role.mediaType === 'tv' && role.episodes > 0 && (
                                    <>
                                        {' '}
                                        <span
                                            className={classes.secondaryText}
                                            data-testid="episodeCount"
                                        >
                                            ({role.episodes} episode
                                            {role.episodes > 1 && 's'}){' '}
                                        </span>
                                    </>
                                )}
                                {role.job && (
                                    <>
                                        {' '}
                                        <span
                                            className={classes.secondaryText}
                                            data-testid="as"
                                        >
                                            as
                                        </span>{' '}
                                        <span data-testid="character">
                                            {role.job}
                                        </span>
                                    </>
                                )}
                            </Text>
                        </div>
                    );
                })}
            </Card>
        </div>
    );
};

export default Roles;
