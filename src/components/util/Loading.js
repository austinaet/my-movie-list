import React from 'react';
import { Loading as GeistLoading } from '@geist-ui/react';

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

const Loading = ({ text = '' }) => {
    const { root } = useStyles();

    return (
        <main className={root}>
            <GeistLoading size="large">{text}</GeistLoading>
        </main>
    );
};

export default Loading;
