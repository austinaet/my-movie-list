import { screen, render, within } from '@testing-library/react';
import Cast from '../Cast';

import { MemoryRouter } from 'react-router-dom';

describe('Person cast component', () => {
    test('Release year is not present', () => {
        const cast = [
            {
                id: 21290,
                video: false,
                vote_count: 51,
                vote_average: 6.8,
                title: 'Strings',
                release_date: '',
                original_language: 'en',
                original_title: 'Strings',
                genre_ids: [12, 16, 18, 14],
                backdrop_path: '/d4qvST6E66quWX6VVHolT2ccabx.jpg',
                adult: false,
                overview:
                    'Strings is a mythological story about the son of a king, Hal Tara, who sets out on a journey to avenge the death of his father. To his surprise he discovers the truth of his own people - and where he least expects it - he finds true love.',
                poster_path: '/bCZu9u1Y54AOSKTl1hq1piS71US.jpg',
                popularity: 7.013,
                character: 'Hal',
                credit_id: '52fe4413c3a368484e00e095',
                order: 0,
                media_type: 'movie',
            },
            {
                backdrop_path: '/2S9M6wmyxHgPnLSaFVcPS0dCI3X.jpg',
                first_air_date: '',
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
                popularity: 4.424,
                character: 'Self',
                credit_id: '6043ecb11a934f006ef9dd16',
                episode_count: 1,
                media_type: 'tv',
            },
        ];
        render(<Cast cast={cast} />, { wrapper: MemoryRouter });

        const year = screen.getAllByTestId('year');
        year.forEach((el) => {
            const yearText = within(el).getByText('--------');
            expect(yearText).toBeInTheDocument();
        });
    });

    test('There is no divider if only one cast item is present', () => {
        const cast = [
            {
                id: 21290,
                video: false,
                vote_count: 51,
                vote_average: 6.8,
                title: 'Strings',
                release_date: '',
                original_language: 'en',
                original_title: 'Strings',
                genre_ids: [12, 16, 18, 14],
                backdrop_path: '/d4qvST6E66quWX6VVHolT2ccabx.jpg',
                adult: false,
                overview:
                    'Strings is a mythological story about the son of a king, Hal Tara, who sets out on a journey to avenge the death of his father. To his surprise he discovers the truth of his own people - and where he least expects it - he finds true love.',
                poster_path: '/bCZu9u1Y54AOSKTl1hq1piS71US.jpg',
                popularity: 7.013,
                character: 'Hal',
                credit_id: '52fe4413c3a368484e00e095',
                order: 0,
                media_type: 'movie',
            },
        ];
        render(<Cast cast={cast} />, { wrapper: MemoryRouter });

        const divider = screen.queryAllByTestId('divider');
        expect(divider.length).toBe(0);
    });

    test('Character name is not rendered if not present', () => {
        const cast = [
            {
                id: 21290,
                video: false,
                vote_count: 51,
                vote_average: 6.8,
                title: 'Strings',
                release_date: '',
                original_language: 'en',
                original_title: 'Strings',
                genre_ids: [12, 16, 18, 14],
                backdrop_path: '/d4qvST6E66quWX6VVHolT2ccabx.jpg',
                adult: false,
                overview:
                    'Strings is a mythological story about the son of a king, Hal Tara, who sets out on a journey to avenge the death of his father. To his surprise he discovers the truth of his own people - and where he least expects it - he finds true love.',
                poster_path: '/bCZu9u1Y54AOSKTl1hq1piS71US.jpg',
                popularity: 7.013,
                character: '',
                credit_id: '52fe4413c3a368484e00e095',
                order: 0,
                media_type: 'movie',
            },
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
                popularity: 4.424,
                character: '',
                credit_id: '6043ecb11a934f006ef9dd16',
                episode_count: 1,
                media_type: 'tv',
            },
        ];
        render(<Cast cast={cast} />, { wrapper: MemoryRouter });

        const as = screen.queryAllByTestId('as');
        expect(as.length).toBe(0);

        const character = screen.queryAllByTestId('character');
        expect(character.length).toBe(0);
    });

    test('Singular episode', () => {
        const cast = [
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
                popularity: 4.424,
                character: 'Self',
                credit_id: '6043ecb11a934f006ef9dd16',
                episode_count: 1,
                media_type: 'tv',
            },
        ];
        render(<Cast cast={cast} />, { wrapper: MemoryRouter });

        const episodes = screen.getByTestId('episodeCount');
        const episodeText = within(episodes).getByText('(1 episode)');
        expect(episodeText).toBeInTheDocument();
    });

    test('Multiple episodes', () => {
        const cast = [
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
                popularity: 4.424,
                character: 'Self',
                credit_id: '6043ecb11a934f006ef9dd16',
                episode_count: 5,
                media_type: 'tv',
            },
        ];
        render(<Cast cast={cast} />, { wrapper: MemoryRouter });

        const episodes = screen.getByTestId('episodeCount');
        const episodeText = within(episodes).getByText('(5 episodes)');
        expect(episodeText).toBeInTheDocument();
    });

    test('No acting roles are passed', () => {
        const cast = [];
        render(<Cast cast={cast} />);
        const acting = screen.queryByTestId('acting');
        expect(acting).toBeNull();
    });
});
