const checkURL = (str) => {
    let url;

    try {
        url = new URL(str);
    } catch (error) {
        return false;
    }

    return url.protocol === 'https:' || url.protocol === 'http:';
};

export default checkURL;
