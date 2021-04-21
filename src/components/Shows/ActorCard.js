import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Text, Image, useTheme } from '@geist-ui/react';

import makeStyles from '../../util/makeStyles';

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
        padding: '8px',
    },
    text: {
        marginBottom: '0',
    },
    '@media screen and (min-width: 900px)': {
        link: {
            margin: '10px',
        },
    },
}));

const Actor = ({ id, name, role, imagePath, innerRef }) => {
    const { link, card, cardContent, content, text } = useStyles();
    const hoverable = useTheme().type === 'dark' ? true : false;

    return (
        <Link to={`/person/${id}`} className={link} innerRef={innerRef}>
            <Card
                width="130px"
                hoverable={hoverable}
                className={card}
                shadow={!hoverable}
            >
                <Card.Content className={cardContent}>
                    <Image
                        width="130"
                        height="231"
                        src={imagePath}
                        alt={name}
                    />
                    <div className={content}>
                        <Text h5 className={text}>
                            {name}
                        </Text>
                        <Text type="secondary" small>
                            {role}
                        </Text>
                    </div>
                </Card.Content>
            </Card>
        </Link>
    );
};

export default Actor;
