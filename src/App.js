import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GeistProvider, CssBaseline } from '@geist-ui/react';
import { JssProvider } from 'react-jss';

import Layout from './components/Layout/Layout';
import LandingPage from './pages/Landing';
import ShowPage from './pages/Show';
import CastPage from './pages/Cast';
import ReviewsPage from './pages/Reviews';
import SeasonsPage from './pages/Seasons';
import EpisodesPage from './pages/Episodes';
import PersonPage from './pages/Person';
import Today from './pages/Today';
import ErrorPage from './components/util/Error';

const getDefaultTheme = () =>
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

function App() {
    const [themeType, setThemeType] = useState(getDefaultTheme());
    const toggleTheme = () =>
        setThemeType((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));

    if (window.matchMedia) {
        const colorSchemeQuery = window.matchMedia(
            '(prefers-color-scheme: dark)'
        );
        colorSchemeQuery.onchange = (e) =>
            setThemeType(e.matches ? 'dark' : 'light');
    }

    return (
        <JssProvider id={{ minify: true }}>
            <GeistProvider theme={{ type: themeType }}>
                <CssBaseline />
                <Router>
                    <Layout toggleTheme={toggleTheme}>
                        <Switch>
                            <Route path="/" exact component={LandingPage} />
                            <Route
                                key="/movie/now_playing"
                                path="/today/movie/now_playing"
                                exact
                                component={Today}
                            />
                            <Route
                                key="/movie/popular"
                                path="/today/movie/popular"
                                exact
                                component={Today}
                            />
                            <Route
                                key="/movie/top_rated"
                                path="/today/movie/top_rated"
                                exact
                                component={Today}
                            />
                            <Route
                                key="/movie/upcoming"
                                path="/today/movie/upcoming"
                                exact
                                component={Today}
                            />
                            <Route
                                key="/tv/airing_today"
                                path="/today/tv/airing_today"
                                exact
                                component={Today}
                            />
                            <Route
                                key="/tv/on_the_air"
                                path="/today/tv/on_the_air"
                                exact
                                component={Today}
                            />
                            <Route
                                key="/tv/popular"
                                path="/today/tv/popular"
                                exact
                                component={Today}
                            />
                            <Route
                                key="/tv/top_rated"
                                path="/today/tv/top_rated"
                                exact
                                component={Today}
                            />
                            <Route
                                key="/person/popular"
                                path="/today/person/popular"
                                exact
                                component={Today}
                            />
                            <Route
                                path="/person/:id"
                                exact
                                component={PersonPage}
                            />
                            <Route
                                path="/:type/:id"
                                exact
                                component={ShowPage}
                            />
                            <Route
                                path="/:type/:id/cast"
                                exact
                                component={CastPage}
                            />
                            <Route
                                path="/:type/:id/reviews"
                                exact
                                component={ReviewsPage}
                            />
                            <Route
                                path="/tv/:id/seasons"
                                exact
                                component={SeasonsPage}
                            />
                            <Route
                                path="/tv/:id/season/:num"
                                exact
                                component={EpisodesPage}
                            />
                            <Route path="/">
                                <ErrorPage
                                    error={{
                                        code: 404,
                                        message: 'Page not found',
                                    }}
                                    setTitle
                                />
                            </Route>
                        </Switch>
                    </Layout>
                </Router>
            </GeistProvider>
        </JssProvider>
    );
}

export default App;
