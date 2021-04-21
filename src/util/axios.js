import axios from 'axios';

export const caller = axios.create({ baseURL: 'https://api.themoviedb.org' });

export const query = {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
    language: 'en-US',
};
