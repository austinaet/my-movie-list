import React from 'react';
import { Text } from '@geist-ui/react';

import makeStyles from '../../util/makeStyles';

const useStyles = makeStyles((ui) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 262.25px)',
        width: '100%'
    },
}));

const ErrorPage = ({ error: { code, message }, setTitle = false }) => {
    const { root } = useStyles();

    if (setTitle) {
        document.title = 'Error';
    }

    return (
        <main className={root}>
            <Text h1>{code}</Text>
            <Text h2>{message}</Text>
        </main>
    );
};

export default ErrorPage;
