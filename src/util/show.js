import convertDate from './convertDate';

export const getBackdropPath = (filename) =>
    filename
        ? `url("https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,000000,555555)${filename}")`
        : '';

export const getPosterPath = (filename, width) =>
    filename
        ? `https://image.tmdb.org/t/p/w${width}${filename}`
        : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';

export const getGenres = (genres) =>
    genres && genres.length > 0
        ? genres.map((genre) => genre.name).join(', ')
        : '';

export const getRuntime = (runtime) => {
    let hours, minutes;
    if (runtime) {
        if (runtime >= 60) {
            hours = Math.floor(runtime / 60);
            minutes = runtime - hours * 60;
        } else {
            minutes = runtime;
        }
    }
    return { hours, minutes };
};

export const getReleaseDate = (releaseDate) =>
    releaseDate ? convertDate(releaseDate) : null;

export const getRatingType = (rating) => {
    if (rating) {
        if (rating <= 2.5) {
            return 'error';
        } else if (rating <= 5) {
            return 'warning';
        } else if (rating <= 7.5) {
            return 'success';
        } else {
            return 'default';
        }
    } else {
        return 'secondary';
    }
};
