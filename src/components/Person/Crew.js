import React from 'react';
import { Spacer, Text, Card, Divider } from '@geist-ui/react';
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

const transformCrew = (crew) => {
    if (crew.length === 0) {
        return {};
    }
    const newCrew = {};
    crew.forEach((role) => {
        if (role.department) {
            if (!newCrew[role.department]) {
                newCrew[role.department] = [];
            }
            newCrew[role.department].push({
                id: role.id,
                title: role.title || role.name,
                releaseYear: getReleaseYear(
                    role.media_type === 'movie'
                        ? role.release_date
                        : role.first_air_date
                ),
                job: role.job,
                mediaType: role.media_type,
                episodes: role.episode_count,
            });
        }
    });
    Object.keys(newCrew).forEach((department) => {
        newCrew[department].sort((a, b) => {
            if (!a.releaseYear) {
                return -100;
            }
            if (!b.releaseYear) {
                return 100;
            }
            return b.releaseYear - a.releaseYear;
        });
    });
    return newCrew;
};

const Department = ({ name, roles }) => {
    const classes = useStyles();

    let year = roles[0].releaseYear;

    return (
        <>
            <Spacer y={0.8} />
            <Text h3>{name}</Text>
            <Card shadow>
                {roles.map((role) => {
                    let isDividerRequired = false;
                    if (year !== role.releaseYear) {
                        isDividerRequired = true;
                        year = role.releaseYear;
                    }
                    return (
                        <div key={role.id * Math.random()}>
                            {isDividerRequired && <Divider />}
                            <Text className={classes.paragraph}>
                                <span>{role.releaseYear || '--------'}</span>
                                <Spacer x={0.8} inline />
                                <Link
                                    to={`/${role.mediaType}/${role.id}`}
                                    className={classes.link}
                                >
                                    {role.title}
                                </Link>
                                {role.mediaType === 'tv' && role.episodes && (
                                    <>
                                        {' '}
                                        <span className={classes.secondaryText}>
                                            ({role.episodes} episode
                                            {role.episodes > 1 && 's'}){' '}
                                        </span>
                                    </>
                                )}
                                {role.job && (
                                    <>
                                        {' '}
                                        <span className={classes.secondaryText}>
                                            as
                                        </span>{' '}
                                        <span>{role.job}</span>
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

const Crew = ({ crew }) => {
    if (crew.length === 0) {
        return null;
    }

    const newCrew = transformCrew(crew);

    return (
        <>
            {Object.keys(newCrew).map((department) => (
                <Department
                    key={department}
                    name={department}
                    roles={newCrew[department]}
                />
            ))}
        </>
    );
};

export default Crew;
