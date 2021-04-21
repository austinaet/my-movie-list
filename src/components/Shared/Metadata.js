import React from 'react';
import { Text, Tooltip } from '@geist-ui/react';

import makeStyles from '../../util/makeStyles';
import getLanguage from '../../util/language';
import convertDate from '../../util/convertDate';

const useStyles = makeStyles((ui) => ({
    topMargin: {
        marginTop: '0',
    },
    bottomMargin: {
        marginBottom: '0',
    },
    networkIcon: {
        backgroundColor: '#ffffff',
        marginRight: '8px',
    },
    person: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'start',
        justifyContent: 'space-evenly',
    },
    '@media screen and (min-width: 900px)': {
        person: {
            flexDirection: 'column',
            justifyContent: 'flex-start',
        },
    },
}));

const KeyValue = ({ keyName, value }) => {
    const classes = useStyles();
    return (
        <div>
            {keyName && (
                <Text p b className={classes.bottomMargin}>
                    {keyName}
                </Text>
            )}
            {value && (
                <Text p className={classes.topMargin}>
                    {value}
                </Text>
            )}
        </div>
    );
};

const toCurrency = (num) => {
    return num && typeof num === 'number'
        ? new Intl.NumberFormat('en-US', {
              currency: 'USD',
              style: 'currency',
          }).format(num)
        : '-';
};

const Metadata = ({
    type,
    data: {
        originalTitle,
        status,
        language,
        budget,
        revenue,
        networks = [],
        type: showType,
        gender,
        knownFor,
        birthday,
        placeOfBirth,
        deathday,
        alsoKnownAs,
    },
}) => {
    const classes = useStyles();

    language = language ? getLanguage(language) : '-';

    let jsxData;
    if (type === 'person') {
        birthday = birthday ? convertDate(birthday) : '-';
        deathday = deathday ? convertDate(deathday) : undefined;
        switch (gender) {
            case 1:
                gender = 'Female';
                break;
            case 2:
                gender = 'Male';
                break;
            case 3:
                gender = 'Non-binary';
                break;
            default:
                gender = 'Not specified';
        }
        jsxData = (
            <div className={classes.person}>
                <div>
                    <KeyValue keyName="Known for" value={knownFor || '-'} />
                    <KeyValue keyName="Gender" value={gender} />
                    <KeyValue keyName="Birthday" value={birthday || '-'} />
                </div>
                <div>
                    {placeOfBirth && (
                        <KeyValue
                            keyName="Place of birth"
                            value={placeOfBirth}
                        />
                    )}
                    {deathday && (
                        <KeyValue keyName="Deathday" value={deathday} />
                    )}
                    {alsoKnownAs.length > 0 && (
                        <>
                            <KeyValue keyName="Also known as" />
                            {alsoKnownAs.map((name) => (
                                <Text
                                    p
                                    className={`${classes.topMargin} ${classes.bottomMargin}`}
                                    key={Math.random()}
                                >
                                    {name}
                                </Text>
                            ))}
                        </>
                    )}
                </div>
            </div>
        );
    } else if (type === 'movie') {
        budget = toCurrency(budget);
        revenue = toCurrency(revenue);
        jsxData = (
            <>
                <KeyValue keyName="Status" value={status || '-'} />
                <KeyValue keyName="Original Language" value={language} />
                {language !== 'English' && (
                    <KeyValue
                        keyName="Original Title"
                        value={originalTitle || '-'}
                    />
                )}
                <KeyValue keyName="Budget" value={budget} />
                <KeyValue keyName="Revenue" value={revenue} />
            </>
        );
    } else {
        jsxData = (
            <>
                <KeyValue keyName="Status" value={status || '-'} />
                <KeyValue keyName="Original Language" value={language} />
                {language !== 'English' && (
                    <KeyValue
                        keyName="Original Title"
                        value={originalTitle || '-'}
                    />
                )}
                {networks.length > 0 && (
                    <>
                        <Text p b>
                            Networks
                        </Text>
                        {networks.map(
                            (network) =>
                                network.logo_path && (
                                    <Tooltip
                                        text={network.name}
                                        hideArrow
                                        key={network.id}
                                    >
                                        <img
                                            src={`https://image.tmdb.org/t/p/w45${network.logo_path}`}
                                            alt={network.name}
                                            className={classes.networkIcon}
                                        />
                                    </Tooltip>
                                )
                        )}
                    </>
                )}
                <KeyValue keyName="Type" value={showType} />
            </>
        );
    }

    return <article>{jsxData}</article>;
};

export default Metadata;
