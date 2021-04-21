import React from 'react';
import { Button, Popover, useTheme, Spacer } from '@geist-ui/react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Search as SearchIcon } from 'react-feather';

import makeStyles from '../../util/makeStyles';

import Content from '../util/Content';
import Search from './Search';

const useStyles = makeStyles((ui) => ({
    header: {
        width: '100%',
        margin: '0 auto',
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
        marginRight: 5,
        padding: '0 !important',
    },
    popover: {
        fontSize: '0.9rem',
        '&:hover': {
            cursor: 'pointer !important',
        },
    },
    link: {
        color: ui.palette.foreground,
        transition: 'color 0.2s',
        '&:hover': {
            color: ui.palette.accents_6,
        },
    },
}));

const MoviePopover = ({ className }) => (
    <>
        <Popover.Item>
            <Link to="/today/movie/now_playing" className={className}>
                Now Playing
            </Link>
        </Popover.Item>
        <Popover.Item>
            <Link to="/today/movie/popular" className={className}>
                Popular
            </Link>
        </Popover.Item>
        <Popover.Item>
            <Link to="/today/movie/top_rated" className={className}>
                Top Rated
            </Link>
        </Popover.Item>
        <Popover.Item>
            <Link to="/today/movie/upcoming" className={className}>
                Upcoming
            </Link>
        </Popover.Item>
    </>
);

const TVPopover = ({ className }) => (
    <>
        <Popover.Item>
            <Link to="/today/tv/airing_today" className={className}>
                Airing Today
            </Link>
        </Popover.Item>
        <Popover.Item>
            <Link to="/today/tv/on_the_air" className={className}>
                On The Air
            </Link>
        </Popover.Item>
        <Popover.Item>
            <Link to="/today/tv/popular" className={className}>
                Popular
            </Link>
        </Popover.Item>
        <Popover.Item>
            <Link to="/today/tv/top_rated" className={className}>
                Top Rated
            </Link>
        </Popover.Item>
    </>
);

const PeoplePopover = ({ className }) => (
    <Popover.Item>
        <Link to="/today/person/popular" className={className}>
            Popular
        </Link>
    </Popover.Item>
);

const Menu = ({ toggleTheme }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [search, setSearch] = React.useState(false);
    const isDark = theme.type === 'dark';

    const showSearch = () => {
        setSearch(true);
    }

    const hideSearch = () => {
        setSearch(false);
    }

    return (
        <div className={`${classes.header} ${classes.headerFixed}`}>
            <Content className={classes.headerContent}>
                <div style={{ display: 'flex' }}>
                    <div className={classes.headerTitle}>
                        <Link to="/" className={classes.title}>
                            MyMovieList
                        </Link>
                    </div>
                    <Spacer inline x={0.5} />
                    <Popover
                        content={() => (
                            <MoviePopover className={classes.link} />
                        )}
                        hideArrow
                        trigger="hover"
                    >
                        <span className={classes.popover}>Movies</span>
                    </Popover>
                    <Spacer inline x={0.5} />
                    <Popover
                        content={() => <TVPopover className={classes.link} />}
                        hideArrow
                        trigger="hover"
                    >
                        <span className={classes.popover}>TV Shows</span>
                    </Popover>
                    <Spacer inline x={0.5} />
                    <Popover
                        content={() => (
                            <PeoplePopover className={classes.link} />
                        )}
                        hideArrow
                        trigger="hover"
                    >
                        <span className={classes.popover}>People</span>
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
    );
};

export default Menu;
