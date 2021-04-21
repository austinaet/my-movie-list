import React from 'react';
import { Text, Tooltip, Image } from '@geist-ui/react';
import { Link } from 'react-router-dom';

import makeStyles from '../../util/makeStyles';

import Scroller from '../util/Scroller';

const useStyles = makeStyles((ui) => ({
    image: {
        marginRight: '8px !important',
    },
}));

const removeDuplicates = (arr) => {
    const seen = new Set();
    return arr.filter((el) => {
        if (seen.has(el.id)) {
            return false;
        } else {
            seen.add(el.id);
            return true;
        }
    });
};

const getKnownFor = (credits) => {
    if (credits.length === 0) {
        return [];
    }
    let fullCredits = credits.filter((credit) =>
        credit.poster_path ? true : false
    );
    fullCredits.sort((a, b) => b.popularity - a.popularity);
    const knownFor = removeDuplicates(fullCredits);
    if (knownFor.length > 10) {
        return knownFor.slice(0, 10);
    }
    return knownFor;
};

const KnownFor = ({ knownFor }) => {
    const classes = useStyles();

    const newKnownfor = getKnownFor([...knownFor.cast, ...knownFor.crew]);
    if (newKnownfor.length === 0) {
        return null;
    }

    return (
        <>
            <Text h3>Popular Movies/TV shows</Text>
            <Scroller>
                {newKnownfor.map((el) => (
                    <Link
                        key={`${el.media_type}${el.id}`}
                        to={`/${el.media_type}/${el.id}`}
                    >
                        <Tooltip text={el.title || el.name} hideArrow>
                            <Image
                                height={231}
                                width={154}
                                src={`https://image.tmdb.org/t/p/w154${el.poster_path}`}
                                alt={el.title || el.name}
                                className={classes.image}
                            />
                        </Tooltip>
                    </Link>
                ))}
            </Scroller>
        </>
    );
};

export default KnownFor;
