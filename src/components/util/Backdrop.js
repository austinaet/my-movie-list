import React from 'react';
import ReactDOM from 'react-dom';

import makeStyles from '../../util/makeStyles';

const useStyles = makeStyles((ui) => ({
    backdrop: {
        position: 'fixed',
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
        zIndex: 100,
        backgroundColor: '#000000',
        transition: 'opacity 0.25s'
    },
    '@media screen and (min-width: 480px)': {
        backdrop: {
            display: 'none !important',
            opacity: '0 !important',
        },
    },
}));

const Backdrop = ({ show, onClick }) => {
    const classes = useStyles();
    const [display, setDisplay] = React.useState('none');
    const [opacity, setOpacity] = React.useState(0);

    React.useEffect(() => {
        if (show) {
            setDisplay('block');
            setTimeout(() => {
                setOpacity(0.75);
            }, 1);
        } else {
            setOpacity(0);
            setTimeout(() => {
                setDisplay('none');
            }, 300);
        }
    }, [show]);

    return ReactDOM.createPortal(
        <div
            className={classes.backdrop}
            style={{ display, opacity }}
            onClick={onClick}
        ></div>,
        document.body
    );
};

export default Backdrop;
