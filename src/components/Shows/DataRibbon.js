import React from 'react';
import { Tag, Dot, Text } from '@geist-ui/react';

import makeStyles from '../../util/makeStyles';
import {
    getGenres,
    getRatingType,
    getReleaseDate,
    getRuntime,
} from '../../util/show';

const useStyles = makeStyles((ui) => ({
    metadata: {
        marginBottom: '10px',
    },
    dot: {
        marginLeft: '8px',
    },
}));

const Ribbon = ({ rating, releaseDate, genres, runtime }) => {
    const classes = useStyles();

    const displayGenres = getGenres(genres);
    const { hours, minutes } = getRuntime(runtime);
    const modifiedReleaseDate = getReleaseDate(releaseDate);
    const tagType = getRatingType(rating);

    return (
        <div className={classes.metadata}>
            {rating > 0 && (
                <>
                    <Tag type={tagType} invert>
                        {rating}/10
                    </Tag>
                </>
            )}
            {rating > 0 &&
                (modifiedReleaseDate ||
                    displayGenres ||
                    (runtime && runtime > 0)) && (
                    <Dot className={classes.dot} />
                )}
            {modifiedReleaseDate && (
                <>
                    <Text span>{modifiedReleaseDate}</Text>
                </>
            )}
            {modifiedReleaseDate &&
                (displayGenres || (runtime && runtime > 0)) && (
                    <Dot className={classes.dot} />
                )}
            {displayGenres && (
                <>
                    <Text span>{displayGenres}</Text>
                </>
            )}
            {displayGenres && runtime && runtime > 0 && (
                <Dot className={classes.dot} />
            )}
            {runtime && runtime > 0 && (
                <>
                    <Text span>
                        {hours ? hours + 'h ' : ''}
                        {minutes + 'm'}
                    </Text>
                </>
            )}
        </div>
    );
};

export default Ribbon;
