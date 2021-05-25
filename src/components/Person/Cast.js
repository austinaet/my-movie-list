import React from 'react';

import Roles from './Roles';

const getReleaseYear = (date) => (date ? +date.split('-')[0] : '');

export const transformCast = (cast) => {
    if (cast.length === 0) {
        return [];
    }
    const roles = cast.map((act) => {
        let newAct = {
            id: act.id,
            title: act.title || act.name,
            releaseYear: getReleaseYear(
                act.media_type === 'movie'
                    ? act.release_date
                    : act.first_air_date
            ),
            job: act.character,
            mediaType: act.media_type,
        };
        if (act.media_type === 'tv') {
            newAct.episodes = act.episode_count;
        }
        return newAct;
    });
    return roles.sort((a, b) => {
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
    if (cast.length === 0) {
        return null;
    }

    const roles = transformCast(cast);

    return <Roles department="Acting" roles={roles}  />;
};

export default Cast;
