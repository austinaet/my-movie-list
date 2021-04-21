const errorHandler = (error) => {
    if (error.response) {
        return {
            code: error.response.status,
            message: error.response.data.status_message,
        };
    } else if (error.request) {
        console.log(error.request);
        return {
            code: 'Unknown Error',
            message: 'No response received from server',
        };
    }

    console.log(error.message);
    return {
        code: 'Request Error',
        message: 'Request setup failed',
    };
};

export default errorHandler;
