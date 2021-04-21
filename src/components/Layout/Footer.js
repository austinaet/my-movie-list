import React from 'react';
import { Text, Link, Image } from '@geist-ui/react';
import { GitHub, Linkedin } from 'react-feather';

import makeStyles from '../../util/makeStyles';

import Content from '../util/Content';

const useStyles = makeStyles((ui) => ({
    footerBorder: {
        borderTop: `solid 1px ${ui.palette.accents_2}`,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        maxWidth: '720px',
        width: '100%',
        height: 'auto',
        paddingTop: '24px',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        borderRadius: '50% !important',
        margin: '0 6px 0 0 !important',
    },
    icon: {
        margin: '0 8px',
    },
    // [`@media screen and (min-width: ${ui.layout.pageWidthWithMargin})`]: {
    //     footer: {
    //         textAlign: 'start !important',
    //     },
    // },
}));

const Footer = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.footerBorder}>
            <Content>
                <div className={classes.content}>
                    <img
                        src="/TMDBLogo.svg"
                        alt="TMDb Logo"
                        className={classes.image}
                    />
                    <Text p style={{ textAlign: 'center' }}>
                        This product uses the{' '}
                        <Link
                            href="https://developers.themoviedb.org/3"
                            target="_blank"
                            rel="noopener noreferrer"
                            underline
                        >
                            TMDB API
                        </Link>{' '}
                        but is not endorsed or certified by{' '}
                        <Link
                            href="https://www.themoviedb.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            underline
                        >
                            TMDb
                        </Link>
                    </Text>
                </div>
                <div className={classes.container}>
                    <div className={classes.container}>
                        <Image
                            className={classes.logo}
                            src="/geist.png"
                            width={32}
                            height={32}
                            alt="Geist"
                        />
                        <Text>
                            Made with{' '}
                            <Link
                                href="https://react.geist-ui.dev/en-us/guide/introduction"
                                target="_blank"
                                rel="noopener noreferrer"
                                underline
                            >
                                Geist
                            </Link>
                        </Text>
                    </div>
                    <div className={classes.container}>
                        <Link
                            href="https://github.com/austinaet/my-movie-list"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GitHub className={classes.icon} />
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/austin-emmanuel-7ba342111/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Linkedin className={classes.icon} />
                        </Link>
                    </div>
                </div>
            </Content>
        </div>
    );
};

export default Footer;
