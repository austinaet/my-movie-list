import React from 'react';

import makeStyles from '../../util/makeStyles';

const useStyles = makeStyles((ui) => ({
    scroller: {
        display: 'flex',
        overflowX: 'auto',
        paddingBottom: '8px',
    },
}));

const Scroller = (props) => {
    const classes = useStyles();
    return <section className={classes.scroller} {...props}>{props.children}</section>;
};

export default Scroller;
