import React from 'react';
import ReactDOM from 'react-dom';
import { Collapse } from '@geist-ui/react';
import { Link } from 'react-router-dom';

import makeStyles from '../../util/makeStyles';
import navLinks from './navLinks';

const useStyles = makeStyles((ui) => ({
    container: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '70%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: ui.palette.background,
        boxShadow: 'rgba(0, 0, 0, 0.1) 0 0 15px 0',
        zIndex: 200,
        transition: 'transform 0.25s',
    },
    links: {
        display: 'flex',
        flexDirection: 'column',
    },
    link: {
        padding: '0.5rem',
        width: '100%',
        fontWeight: 'bold',
        fontSize: '1.5rem'
    },
    '@media screen and (min-width: 480px)': {
        container: {
            display: 'none',
        },
    },
}));

const Sidenav = ({ show, close }) => {
    const classes = useStyles();
    const [transform, setTransform] = React.useState('translateX(-1000px)');

    React.useEffect(() => {
        if (show) {
            setTransform('translateX(0)');
        } else {
            setTransform('translateX(-1000px)');
        }
    }, [show]);

    return ReactDOM.createPortal(
        <div className={classes.container} style={{ transform }}>
            <Collapse.Group>
                {Object.keys(navLinks).map((heading) => (
                    <Collapse title={heading} key={heading}>
                        <div className={classes.links}>
                            {Object.keys(navLinks[heading]).map((type) => (
                                <Link
                                    to={navLinks[heading][type]}
                                    onClick={close}
                                    key={type}
                                    className={classes.link}
                                >
                                    {type}
                                </Link>
                            ))}
                        </div>
                    </Collapse>
                ))}
            </Collapse.Group>
        </div>,
        document.body
    );
};

export default Sidenav;
