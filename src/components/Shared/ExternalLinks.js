import React from 'react';
import { Tooltip, Link } from '@geist-ui/react';
import { Home, Twitter, Facebook, Instagram } from 'react-feather';

import makeStyles from '../../util/makeStyles';

const useStyles = makeStyles((ui) => ({
    icon: {
        marginRight: '16px',
    },
    person: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    '@media screen and (min-width: 900px)': {
        person: {
            display: 'block',
        },
    },
}));

const External = ({
    externalIds: {
        acebook_id: facebook,
        instagram_id: instagram,
        twitter_id: twitter,
        homepage,
    },
    type = 'movie',
}) => {
    const classes = useStyles();

    return facebook || instagram || twitter || homepage ? (
        <div className={type === 'person' ? classes.person : ''}>
            {homepage && (
                <span className={classes.icon}>
                    <Tooltip text="Visit Homepage" hideArrow>
                        <Link
                            href={homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Home />
                        </Link>
                    </Tooltip>
                </span>
            )}
            {facebook && (
                <span className={classes.icon}>
                    <Tooltip text="Visit Facebook" hideArrow>
                        <Link
                            href={`https://www.facebook.com/${facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Facebook />
                        </Link>
                    </Tooltip>
                </span>
            )}
            {twitter && (
                <span className={classes.icon}>
                    <Tooltip text="Visit Twitter" hideArrow>
                        <Link
                            href={`https://twitter.com/${twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Twitter />
                        </Link>
                    </Tooltip>
                </span>
            )}
            {instagram && (
                <span className={classes.icon}>
                    <Tooltip text="Visit Instagram" hideArrow>
                        <Link
                            href={`https://instagram.com/${instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Instagram />
                        </Link>
                    </Tooltip>
                </span>
            )}
        </div>
    ) : null;
};

export default External;
