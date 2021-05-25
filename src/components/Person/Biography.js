import React from 'react';
import { Text, Button } from '@geist-ui/react';

import makeStyles from '../../util/makeStyles';

const useStyles = makeStyles((ui) => ({
    biography: {
        whiteSpace: 'pre-line',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 0 1rem 0',
        padding: '0',
    },
}));

const shortenBio = (bio) => bio.substring(0, 497).trim() + '...';

const Biography = ({ biography }) => {
    const classes = useStyles();
    const [bio, setBio] = React.useState();
    const [isShortBio, setIsShortBio] = React.useState(false);
    const [isBioExpanded, setIsBioExpanded] = React.useState(false);

    React.useEffect(() => {
        if (!biography) {
            setBio('No biography written yet.');
            setIsShortBio(true);
            setIsBioExpanded(true);
        } else {
            if (biography.length > 550) {
                setBio(shortenBio(biography));
            } else {
                setBio(biography);
                setIsShortBio(true);
                setIsBioExpanded(true);
            }
        }
    }, [biography]);

    const showMoreHandler = () => {
        if (isBioExpanded) {
            setBio(shortenBio(biography));
            setIsBioExpanded(false);
        } else {
            setBio(biography);
            setIsBioExpanded(true);
        }
    };

    return (
        <>
            <Text h3>Biography</Text>
            <Text p className={classes.biography} data-testid="biography">
                {bio}
            </Text>
            {!isShortBio && (
                <div className={classes.buttonContainer}>
                    <Button
                        size="mini"
                        type="secondary"
                        ghost
                        onClick={showMoreHandler}
                        className={classes.button}
                        data-testid="expandBioButton"
                    >
                        {isBioExpanded ? 'Show Less' : 'Show More'}
                    </Button>
                </div>
            )}
        </>
    );
};

export default Biography;
