import { transformCrew } from '../Crew';

test('Single department transform', () => {
    const role = [
        {
            video: false,
            vote_average: 6.7,
            id: 43629,
            overview:
                'In his squalid apartment, a man tries to squash with his shoe an insect of some kind that is moving around the room.',
            release_date: '1997-01-01',
            adult: false,
            backdrop_path: '/t1NlvLU5xJamUTPVwnWi2o9nR76.jpg',
            vote_count: 310,
            genre_ids: [53, 14, 9648],
            title: 'Doodlebug',
            original_language: 'en',
            original_title: 'Doodlebug',
            poster_path: '/cXDFFv6yZNW3vUHOKKUPJNnL0So.jpg',
            popularity: 5.124,
            credit_id: '595e4934c3a368265d085a8f',
            department: 'Art',
            job: 'Set Designer',
            media_type: 'movie',
        },
    ];
    const transformedRoles = transformCrew(role);

    expect(transformedRoles).toStrictEqual({
        Art: [
            {
                id: 43629,
                title: 'Doodlebug',
                releaseYear: 1997,
                job: 'Set Designer',
                mediaType: 'movie',
                episodes: null,
            },
        ],
    });
});

test('Multiple department transform', () => {
    const roles = [
        {
            adult: false,
            backdrop_path: '/4kjQK9aanydnmMm6S6QOr1FLy6c.jpg',
            genre_ids: [18, 53],
            id: 11660,
            original_language: 'en',
            original_title: 'Following',
            overview:
                'Bill, an idle, unemployed aspiring writer, walks the crowded streets of London following randomly chosen strangers, a seemingly innocent entertainment that becomes dangerous when he crosses paths with a mysterious character.',
            poster_path: '/5giub1nKK3sFRvZxmebe31scQOo.jpg',
            release_date: '1999-04-02',
            title: 'Following',
            video: false,
            vote_average: 7.2,
            vote_count: 1036,
            popularity: 8.379,
            credit_id: '52fe44739251416c75035321',
            department: 'Camera',
            job: 'Director of Photography',
            media_type: 'movie',
        },
        {
            adult: false,
            backdrop_path: '/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
            genre_ids: [12, 18, 878],
            id: 157336,
            original_language: 'en',
            original_title: 'Interstellar',
            overview:
                'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.',
            poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
            release_date: '2014-11-05',
            title: 'Interstellar',
            video: false,
            vote_average: 8.3,
            vote_count: 25744,
            popularity: 75.017,
            credit_id: '5e83abfad236e60017fd99ed',
            department: 'Directing',
            job: 'Director',
            media_type: 'movie',
        },
    ];
    const transformedRoles = transformCrew(roles);

    expect(transformedRoles).toStrictEqual({
        Camera: [
            {
                id: 11660,
                title: 'Following',
                releaseYear: 1999,
                job: 'Director of Photography',
                mediaType: 'movie',
                episodes: null,
            },
        ],
        Directing: [
            {
                id: 157336,
                title: 'Interstellar',
                releaseYear: 2014,
                job: 'Director',
                mediaType: 'movie',
                episodes: null,
            },
        ],
    });
});

test('No crew roles', () => {
    const transformedRoles = transformCrew([]);
    expect(transformedRoles).toStrictEqual({});
});
