import React from 'react';
import { useParams } from 'react-router-dom';
import { Spacer, Text, Image, Grid } from '@geist-ui/react';

import errorHandler from '../util/errorHandler';
import { caller, query } from '../util/axios';
import makeStyles from '../util/makeStyles';

import Loading from '../components/util/Loading';
import ErrorPage from '../components/util/Error';
import Content from '../components/util/Content';
import Metadata from '../components/Shared/Metadata';
import ExternalLinks from '../components/Shared/ExternalLinks';
import Biography from '../components/Person/Biography';
import KnownFor from '../components/Person/KnownFor';
import Cast from '../components/Person/Cast';
import Crew from '../components/Person/Crew';

const useStyles = makeStyles((ui) => ({
    imageContainer: {
        margin: '0 auto',
    },
    biography: {
        whiteSpace: 'pre-line',
    },
    mobile__name: {
        display: 'block',
        marginBottom: '0',
        textAlign: 'center',
    },
    name: {
        display: 'none',
    },
    '@media screen and (min-width: 900px)': {
        imageContainer: {
            '& div': {
                margin: '0 !important',
            },
        },
        mobile__name: {
            display: 'none',
        },
        name: {
            display: 'block',
        },
    },
}));

const Person = (props) => {
    const { id } = useParams();
    const classes = useStyles();

    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState();
    const [details, setDetails] = React.useState();
    const [externalIds, setExternalIds] = React.useState();
    const [cast, setCast] = React.useState();
    const [crew, setCrew] = React.useState();
    const [knownFor, setKnownFor] = React.useState();

    React.useEffect(() => {
        const getDetails = async (id) => {
            try {
                const [
                    detailsResponse,
                    externalIdsResponse,
                    creditsResponse,
                ] = await Promise.all([
                    caller.get(
                        `/3/person/${id}?api_key=${query.api_key}&language=${query.language}`
                    ),
                    caller.get(
                        `/3/person/${id}/external_ids?api_key=${query.api_key}&language=${query.language}`
                    ),
                    caller.get(
                        `/3/person/${id}/combined_credits?api_key=${query.api_key}&language=${query.language}`
                    ),
                ]);
                setDetails(detailsResponse.data);
                setExternalIds(externalIdsResponse.data);
                setCast(creditsResponse.data.cast);
                setCrew(creditsResponse.data.crew);
                setKnownFor(creditsResponse.data);
                document.title = detailsResponse.data.name;
            } catch (error) {
                setError(errorHandler(error));
            }
            setLoading(false);
        };

        if (typeof +id !== 'number') {
            setError({ code: 400, message: 'Invalid request URL' });
            setLoading(false);
        } else {
            getDetails(id);
        }
        return () => (document.title = 'My Movie List');
    }, [id]);

    return (
        <>
            {loading && <Loading text="Loading person details..." />}
            {!loading && error && <ErrorPage error={error} setTitle />}
            {!loading && !error && (
                <Content>
                    <Spacer y={0.8} />
                    <Grid.Container gap={0.8}>
                        <Grid xs={24} sm={24} md={5} lg={5} xl={5}>
                            <div className={classes.imageContainer}>
                                <Image
                                    height={277}
                                    width={185}
                                    src={
                                        details.profile_path
                                            ? `https://image.tmdb.org/t/p/w185${details.profile_path}`
                                            : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
                                    }
                                    alt={details.name}
                                />
                            </div>
                            <Spacer y={0.8} />
                            <Text h1 className={classes.mobile__name}>
                                {details.name}
                            </Text>
                            <ExternalLinks
                                type="person"
                                externalIds={{
                                    ...externalIds,
                                    homepage: details.homepage,
                                }}
                            />
                            <Metadata
                                type="person"
                                data={{
                                    gender: details.gender,
                                    knownFor: details.known_for_department,
                                    birthday: details.birthday,
                                    placeOfBirth: details.place_of_birth,
                                    deathday: details.deathday,
                                    alsoKnownAs: details.also_known_as,
                                }}
                            />
                        </Grid>
                        <Grid xs={24} sm={24} md={19} lg={19} xl={19}>
                            <Text h1 className={classes.name}>
                                {details.name}
                            </Text>
                            <Biography biography={details.biography} />
                            <KnownFor knownFor={knownFor} />
                            <Spacer y={0.8} />
                            <Cast cast={cast} />
                            <Crew crew={crew} />
                        </Grid>
                    </Grid.Container>
                    <Spacer y={0.8} />
                </Content>
            )}
        </>
    );
};

export default Person;
