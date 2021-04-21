import React from 'react';
import { Card, Image, Text } from '@geist-ui/react';
import { Link } from 'react-router-dom';

import makeStyles from '../../util/makeStyles';
import convertDate from '../../util/convertDate';

const useStyles = makeStyles((ui) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        padding: '0',
        marginRight: '24px',
    },
    title: {
        marginBottom: '0',
    },
    subTextMargin: {
        marginTop: '0',
    },
    overview: {
        display: 'none'
    },
    mobile__overview: {
        display: 'block'
    },
    link: {
        color: ui.palette.success,
        transition: 'color 0.2s',
        '&:hover': {
            color: ui.type === 'dark' ? ui.palette.successLight : ui.palette.successDark,
        },
    },
    '@media screen and (min-width: 768px)': {
        container: {
            justifyContent: 'start',
            alignItems: 'start',
        },
        image: {
            marginRight: '32px',
        },
        overview: {
            display: 'block'
        },
        mobile__overview: {
            display: 'none'
        }
    },
}));

const SOE = ({
    type,
    name,
    num,
    airDate,
    title,
    episodes,
    overview,
    poster,
    link,
    shrinkOverview = false,
    showLink = false,
}) => {
    const classes = useStyles();

    let height, width;
    if (type === 'season') {
        height = 223;
        width = 154;
    } else {
        height = 103;
        width = 185;
    }

    let subText = '';
    if (airDate) {
        subText += convertDate(airDate);
    }

    if (episodes) {
        if (subText.length > 0) {
            subText += ' | ';
        }
        subText += `${episodes} episodes`;
    }

    let overviewShrunk = false;
    if (shrinkOverview && overview && overview.length > 200) {
        overview = overview.substring(0, 200).trim() + '...';
        overviewShrunk = true;
    }

    const posterPath = poster
        ? `https://image.tmdb.org/t/p/w${width}${poster}`
        : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';

    const overviewJSX = (
        <>
            <Text p>
                {overview
                    ? overview
                    : `${
                          type === 'season' ? 'Season' : 'Episode'
                      } ${num} of ${name}`}
            </Text>
            {(overviewShrunk || showLink) && (
                <Text p>
                    <Link to={link} className={classes.link}>View more details</Link>
                </Text>
            )}
        </>
    );

    return (
        <Card shadow>
            <div className={classes.container}>
                <div className={classes.image}>
                    <Image
                        width={width}
                        height={height}
                        src={posterPath}
                        alt={title}
                    />
                </div>
                <div>
                    <Text h3 className={classes.title}>
                        {title}
                    </Text>
                    {subText && (
                        <Text p b className={classes.subTextMargin}>
                            {subText}
                        </Text>
                    )}
                    <div className={classes.overview}>{overviewJSX}</div>
                </div>
            </div>
            <div className={classes.mobile__overview}>{overviewJSX}</div>
        </Card>
    );
};

export default SOE;
