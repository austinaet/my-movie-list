import React from 'react';
import { Text, Tooltip, Image } from '@geist-ui/react';
import { Link } from 'react-router-dom';

import makeStyles from '../../util/makeStyles';

import Scroller from '../util/Scroller';

const useStyles = makeStyles((ui) => ({
    title: {
        margin: '6px 0 0 0',
        textAlign: 'center',
        color: `${ui.palette.foreground} !important`,
    },
    card: {
        marginRight: '8px',
    },
}));

const Recommendations = ({ type, recommendations: recs }) => {
    const classes = useStyles();

    if (recs.total_results === 0) {
        return (
            <>
                <Text h3>Recommendations</Text>
                <Text p>
                    We don't have any recommendations based on this movie
                </Text>
            </>
        );
    }

    const jsxData = recs.results.map(({ id, title, name, backdrop_path }) => {
        if (!backdrop_path) {
            return null;
        }
        let seriesName = title || name;
        if (seriesName.length > 40) {
            seriesName = seriesName.substring(0, 37).trim() + '...';
        }
        return (
            <Link to={`/${type}/${id}`} className={classes.card} key={id}>
                <Tooltip text={title || name} hideArrow>
                    <Image
                        width={300}
                        height={169}
                        src={`https://image.tmdb.org/t/p/w300${backdrop_path}`}
                        alt={title || name}
                    />
                    <Text className={classes.title}>{seriesName}</Text>
                </Tooltip>
            </Link>
        );
    });

    return (
        <>
            <Text h3>Recommendations</Text>
            <Scroller>{jsxData}</Scroller>
        </>
    );
};

export default Recommendations;
