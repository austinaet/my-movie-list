import React from 'react';
import debounce from 'lodash/debounce';
import { AutoComplete, Modal } from '@geist-ui/react';
import { Link } from 'react-router-dom';

import { caller, query } from '../../util/axios';
import makeStyles from '../../util/makeStyles';

const useStyles = makeStyles((ui) => ({
    link: {
        padding: '4px 0',
        width: '100%',
        color: ui.palette.foreground,
        transition: 'color 0.2s',
        '&:hover': {
            color: ui.palette.accents_6,
        },
    },
}));

const Search = ({ isVisible, hide }) => {
    const classes = useStyles();

    const [options, setOptions] = React.useState([]);
    const [input, setInput] = React.useState('');
    const [searching, setSearching] = React.useState(false);

    const makeOptions = (mediaType, name, id) => {
        let link;
        switch (mediaType) {
            case 'movie':
                link = `/movie/${id}`;
                break;
            case 'person':
                link = `/person/${id}`;
                break;
            case 'tv':
                link = `/tv/${id}`;
                break;
            default:
                link = '/page-not-found';
        }
        return (
            <AutoComplete.Option value={name}>
                <Link to={link} className={classes.link} onClick={hide}>
                    {name} ({mediaType})
                </Link>
            </AutoComplete.Option>
        );
    };

    // eslint-disable-next-line
    const getOptions = React.useCallback(
        debounce(async (input) => {
            try {
                setSearching(true);
                const response = await caller.get(
                    `/3/search/multi?api_key=${query.api_key}&language=${query.language}&query=${input}&page=1&inclue_adult=true`
                );
                const { data } = response;
                if (response.status === 200) {
                    const results = data.results.map(
                        ({
                            media_type: mediaType,
                            title = '',
                            name = '',
                            id = 0,
                        }) =>
                            mediaType === 'movie'
                                ? makeOptions('movie', title, id)
                                : makeOptions(mediaType, name, id)
                    );
                    setOptions(results);
                } else {
                    console.error(
                        `${data.status_code} Error: ${data.status_message}`
                    );
                    setOptions([]);
                }
                setSearching(false);
            } catch (error) {
                console.error(error.message);
                setSearching(false);
                setOptions([]);
            }
        }, 500),
        []
    );

    React.useEffect(() => {
        if (input) {
            getOptions(input);
        }
    }, [input, getOptions]);

    return (
        <Modal open={isVisible} onClose={hide} disableBackdropClick>
            <Modal.Title>Search</Modal.Title>
            <Modal.Content>
                <AutoComplete
                    placeholder="Search for a TV show, movie, or a person..."
                    width="100%"
                    options={options}
                    status="secondary"
                    onChange={(value) => setInput(value)}
                    searching={searching}
                    clearable
                />
            </Modal.Content>
            <Modal.Action passive onClick={hide}>Close</Modal.Action>
        </Modal>
    );
};

export default Search;
