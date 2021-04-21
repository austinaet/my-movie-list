import React from 'react';

import makeStyles from '../../util/makeStyles';

import Heading from './Heading';
import Footer from './Footer';

const useStyles = makeStyles((ui) => ({
    main: {
        flex: '1 !important',
    },
}));

const Layout = (props) => {
    const classes = useStyles();
    return (
        <>
            <Heading toggleTheme={props.toggleTheme} />
            <div className={classes.main}>{props.children}</div>
            <Footer />
        </>
    );
};

export default Layout;
