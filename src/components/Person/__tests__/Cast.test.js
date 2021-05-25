import { transformCast } from '../Cast';

test('Transform Movie role', () => {
    const roles = [
        {
            id: 21290,
            video: false,
            vote_count: 51,
            vote_average: 6.8,
            title: 'Strings',
            release_date: '2004-10-24',
            original_language: 'en',
            original_title: 'Strings',
            genre_ids: [12, 16, 18, 14],
            backdrop_path: '/d4qvST6E66quWX6VVHolT2ccabx.jpg',
            adult: false,
            overview:
                'Strings is a mythological story about the son of a king, Hal Tara, who sets out on a journey to avenge the death of his father. To his surprise he discovers the truth of his own people - and where he least expects it - he finds true love.',
            poster_path: '/bCZu9u1Y54AOSKTl1hq1piS71US.jpg',
            popularity: 5.084,
            character: 'Hal',
            credit_id: '52fe4413c3a368484e00e095',
            order: 0,
            media_type: 'movie',
        },
    ];
    const transformedRoles = transformCast(roles);

    expect(transformedRoles).toStrictEqual([
        {
            id: 21290,
            title: 'Strings',
            releaseYear: 2004,
            job: 'Hal',
            mediaType: 'movie',
        },
    ]);
});

test('Transform TV Show role', () => {
    const roles = [
        {
            backdrop_path: '/2S9M6wmyxHgPnLSaFVcPS0dCI3X.jpg',
            first_air_date: '2018-03-06',
            genre_ids: [10764],
            id: 77588,
            name: 'The Great Celebrity Bake Off for SU2C',
            origin_country: ['GB'],
            original_language: 'en',
            original_name: 'The Great Celebrity Bake Off for SU2C',
            overview:
                'The Great British Bake Off returns with five special episodes for Stand Up To Cancer. In each episode of The Great Celebrity Bake Off for Stand Up To Cancer Sandi Toksvig and Noel Fielding are joined by four different celebrities all aiming to impress judges Paul Hollywood and Prue Leith with their baking skills.',
            poster_path: '/s1mpZPHYyCae8wRbu2wVcMsH9hx.jpg',
            vote_average: 9.0,
            vote_count: 1,
            popularity: 5.977,
            character: 'Self',
            credit_id: '6043ecb11a934f006ef9dd16',
            episode_count: 1,
            media_type: 'tv',
        },
    ];
    const transformedRoles = transformCast(roles);

    expect(transformedRoles).toStrictEqual([
        {
            id: 77588,
            title: 'The Great Celebrity Bake Off for SU2C',
            releaseYear: 2018,
            job: 'Self',
            mediaType: 'tv',
            episodes: 1,
        },
    ]);
});

test('Combined TV shows and Movies', () => {
    const roles = [
        {
            vote_average: 7.3,
            overview:
                'Though Kevin has evidenced 23 personalities to his trusted psychiatrist, Dr. Fletcher, there remains one still submerged who is set to materialize and dominate all the others. Compelled to abduct three teenage girls led by the willful, observant Casey, Kevin reaches a war for survival among all of those contained within him — as well as everyone around him — as the walls between his compartments shatter apart.',
            release_date: '2016-11-15',
            adult: false,
            backdrop_path: '/9pkZesKMnblFfKxEhQx45YQ2kIe.jpg',
            vote_count: 13805,
            genre_ids: [27, 53],
            id: 381288,
            original_language: 'en',
            original_title: 'Split',
            poster_path: '/bqb9WsmZmDIKxqYmBJ9lj7J6hzn.jpg',
            title: 'Split',
            video: false,
            popularity: 49.68,
            character: 'Kevin Wendell Crumb',
            credit_id: '56b4094192514114eb003384',
            order: 0,
            media_type: 'movie',
        },
        {
            first_air_date: '2004-01-13',
            vote_count: 73,
            original_name: 'Shameless',
            origin_country: ['GB'],
            genre_ids: [35, 18],
            original_language: 'en',
            id: 1906,
            overview:
                "The story of a young group of siblings pretty much abandoned by their parents, surviving by their wits - and humor - on a rough Manchester council estate. Whilst they won't admit it, they need help and find it in Steve, a young middle class lad who falls for Fiona, the oldest sibling, and increasingly finds himself drawn to this unconventional and unique family. Anarchic family life seen through the eyes of an exceptionally bright fifteen year old, who struggles to come of age in the context of his belligerent father, closeted brother, psychotic sister and internet porn star neighbors.",
            poster_path: '/kE30UWJvJZ03KIIJMmL6m6YoG0l.jpg',
            name: 'Shameless',
            backdrop_path: '/1FWw7Q5gn74tYVsyLdo3AcO3LNR.jpg',
            vote_average: 7.6,
            popularity: 16.685,
            character: '',
            credit_id: '52571960760ee3776a17ec37',
            episode_count: 6,
            media_type: 'tv',
        },
    ];
    const transformedRoles = transformCast(roles);

    expect(transformedRoles).toStrictEqual([
        {
            id: 381288,
            title: 'Split',
            releaseYear: 2016,
            job: 'Kevin Wendell Crumb',
            mediaType: 'movie',
        },
        {
            id: 1906,
            title: 'Shameless',
            releaseYear: 2004,
            job: '',
            mediaType: 'tv',
            episodes: 6,
        },
    ]);
});

test('No acting roles', () => {
    const transformedRoles = transformCast([]);
    expect(transformedRoles).toStrictEqual([]);
});
