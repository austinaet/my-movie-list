import React from 'react';
import { Button, Popover, useTheme } from '@geist-ui/react';
import { Link } from 'react-router-dom';
import {
    Sun,
    Moon,
    Search as SearchIcon,
    Menu as MenuIcon,
} from 'react-feather';

import makeStyles from '../../util/makeStyles';
import navLinks from './navLinks';

import Content from '../util/Content';
import Search from './Search';
import Backdrop from '../util/Backdrop';
import Sidenav from './Sidenav';

const useStyles = makeStyles((ui) => ({
    header: {
        width: '100%',
        margin: '0',
        backgroundColor: ui.palette.background,
        fontSize: 16,
        height: 60,
        zIndex: 15,
        position: 'sticky',
        top: 0,
        borderBottom: `solid 1px ${ui.palette.accents_2}`,
    },
    headerContent: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        color: ui.palette.foreground,
    },
    headerFixed: {
        borderBottom: ui.type === 'light' && 'none',
        boxShadow: ui.type === 'light' && 'rgba(0, 0, 0, 0.1) 0 0 15px 0',
    },
    sidebar: {
        display: 'flex',
        alignItems: 'center !important',
    },
    icon: {
        width: '40px !important',
        height: '40px !important',
        display: 'flex !important',
        justifyContent: 'center !important',
        alignItems: 'center !important',
        padding: '0 !important',
    },
    popover: {
        display: 'none !important',
    },
    popoverText: {
        fontSize: '0.9rem',
        marginLeft: '4px',
        '&:hover': {
            cursor: 'pointer !important',
        },
    },
    menuIcon: {
        display: 'inline',
    },
    link: {
        color: ui.palette.foreground,
        transition: 'color 0.2s',
        '&:hover': {
            color: ui.palette.accents_6,
        },
    },
    '@media screen and (min-width: 480px)': {
        icon: {
            marginRight: 5,
        },
        header: {
            margin: '0 auto',
        },
        popover: {
            display: 'block !important',
        },
        popoverText: {
            marginLeft: '16px',
        },
        menuIcon: {
            display: 'none !important',
        },
    },
}));

const MoviePopover = ({ className }) => {
    const movieLinks = navLinks.Movies;
    return (
        <>
            {Object.keys(movieLinks).map((type) => (
                <Popover.Item key={movieLinks[type]}>
                    <Link to={movieLinks[type]} className={className}>
                        {type}
                    </Link>
                </Popover.Item>
            ))}
        </>
    );
};

const TVPopover = ({ className }) => {
    const tvLinks = navLinks['TV Shows'];
    return (
        <>
            {Object.keys(tvLinks).map((type) => (
                <Popover.Item key={tvLinks[type]}>
                    <Link to={tvLinks[type]} className={className}>
                        {type}
                    </Link>
                </Popover.Item>
            ))}
        </>
    );
};

const PeoplePopover = ({ className }) => {
    const peopleLinks = navLinks.People;
    return (
        <>
            {Object.keys(peopleLinks).map((type) => (
                <Popover.Item key={peopleLinks[type]}>
                    <Link to={peopleLinks[type]} className={className}>
                        {type}
                    </Link>
                </Popover.Item>
            ))}
        </>
    );
};

const Menu = ({ toggleTheme }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [search, setSearch] = React.useState(false);
    const [showSideNav, setShowSideNav] = React.useState(false);
    const isDark = theme.type === 'dark';

    const showSearch = () => {
        setSearch(true);
    };

    const hideSearch = () => {
        setSearch(false);
    };

    const showSideNavHandler = () => {
        setShowSideNav(true);
    };

    const hideSideNavHandler = () => {
        setShowSideNav(false);
    };

    return (
        <>
            <Backdrop show={showSideNav} onClick={hideSideNavHandler} />
            <Sidenav show={showSideNav} close={hideSideNavHandler} />
            <div className={`${classes.header} ${classes.headerFixed}`}>
                <Content className={classes.headerContent}>
                    <Button
                        aria-label="Menu"
                        className={`${classes.icon} ${classes.menuIcon}`}
                        auto
                        type="abort"
                        onClick={showSideNavHandler}
                    >
                        <MenuIcon size={16} />
                    </Button>
                    <div style={{ display: 'flex' }}>
                        <div className={classes.headerTitle}>
                            <Link to="/" className={classes.title}>
                                MyMovieList
                            </Link>
                        </div>
                        <Popover
                            content={() => (
                                <MoviePopover className={classes.link} />
                            )}
                            hideArrow
                            trigger="hover"
                            className={classes.popover}
                        >
                            <span className={classes.popoverText}>Movies</span>
                        </Popover>
                        <Popover
                            content={() => (
                                <TVPopover className={classes.link} />
                            )}
                            hideArrow
                            trigger="hover"
                            className={classes.popover}
                        >
                            <span className={classes.popoverText}>
                                TV Shows
                            </span>
                        </Popover>
                        <Popover
                            content={() => (
                                <PeoplePopover className={classes.link} />
                            )}
                            hideArrow
                            trigger="hover"
                            className={classes.popover}
                        >
                            <span className={classes.popoverText}>People</span>
                        </Popover>
                    </div>
                    <div className={classes.sidebar}>
                        <Button
                            aria-label="Search"
                            className={classes.icon}
                            auto
                            type="abort"
                            onClick={showSearch}
                        >
                            <SearchIcon size={16} />
                            <Search isVisible={search} hide={hideSearch} />
                        </Button>
                        <Button
                            aria-label="Toggle Theme"
                            className={classes.icon}
                            auto
                            type="abort"
                            onClick={toggleTheme}
                        >
                            {isDark ? <Sun size={16} /> : <Moon size={16} />}
                        </Button>
                    </div>
                </Content>
            </div>
        </>
    );
};

export default Menu;
