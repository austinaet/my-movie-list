import React from 'react';

import makeStyles from '../../util/makeStyles';

const useStyles = makeStyles((ui) => ({
    content: {
        margin: '0 auto',
        padding: `0 ${ui.layout.pageMargin}`,
        boxSizing: 'border-box !important',
    },
    [`@media screen and (min-width: ${ui.layout.pageWidthWithMargin})`]: {
        content: {
            width: ui.layout.pageWidthWithMargin,
        },
    },
}));

const Content = ({ className = '', style = {}, children }) => {
    const classes = useStyles();

    return (
        <main className={`${classes.content} ${className}`} style={style}>
            {children}
        </main>
    );
};

export default Content;
