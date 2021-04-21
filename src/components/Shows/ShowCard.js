import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Text, Image, Tag, useTheme } from '@geist-ui/react';

import makeStyles from '../../util/makeStyles';
import convertDate from '../../util/convertDate';

const useStyles = makeStyles((ui) => ({
    link: {
        margin: '5px',
    },
    card: {
        height: '100%',
        overflowY: 'hidden',
    },
    cardContent: {
        padding: '0 !important',
    },
    content: {
        marginTop: '-15px',
        padding: '8px',
    },
    text: {
        marginBottom: '0',
    },
    tag: {
        marginLeft: '8px',
        transform: 'translateY(-15px)',
    },
    '@media screen and (min-width: 900px)': {
        link: {
            margin: '10px',
        },
    },
}));

const Show = ({ id, showType, title, rating, poster, releaseDate, innerRef }) => {
    const classes = useStyles();
    const hoverable = useTheme().type === 'dark' ? true : false;

    releaseDate = releaseDate ? convertDate(releaseDate) : null;

    return (
        <Link to={`/${showType}/${id}`} className={classes.link} innerRef={innerRef}>
            <Card
                width="154px"
                hoverable={hoverable}
                className={classes.card}
                shadow={!hoverable}
            >
                <Card.Content className={classes.cardContent}>
                    <Image width={154} height={231} src={poster} alt={title} />
                    <Tag invert className={classes.tag}>{rating ? `${rating}/10` : 'N/A'}</Tag>
                    <div className={classes.content}>
                        <Text h5 className={classes.text}>
                            {title}
                        </Text>
                        {releaseDate && (
                            <Text type="secondary" small>
                                {releaseDate}
                            </Text>
                        )}
                    </div>
                </Card.Content>
            </Card>
        </Link>
    );
};

export default Show;
