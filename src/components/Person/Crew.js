import React from 'react';

import Roles from './Roles';

const getReleaseYear = (date) => (date ? +date.split('-')[0] : '');

export const transformCrew = (crew) => {
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
                episodes: role.episode_count ? role.episode_count : null,
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

const Crew = ({ crew }) => {
    if (crew.length === 0) {
        return null;
    }

    const newCrew = transformCrew(crew);

    return (
        <>
            {Object.keys(newCrew).map((department) => (
                <Roles
                    key={department}
                    department={department}
                    roles={newCrew[department]}
                />
            ))}
        </>
    );
};

export default Crew;
