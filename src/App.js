import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GeistProvider, CssBaseline, Loading } from '@geist-ui/react';
import { JssProvider } from 'react-jss';

import Layout from './components/Layout/Layout';
import ErrorPage from './components/util/Error';
import LandingPage from './pages/Landing';

const ShowPage = React.lazy(() => import('./pages/Show'));
const CastPage = React.lazy(() => import('./pages/Cast'));
const ReviewsPage = React.lazy(() => import('./pages/Reviews'));
const SeasonsPage = React.lazy(() => import('./pages/Seasons'));
const EpisodesPage = React.lazy(() => import('./pages/Episodes'));
const PersonPage = React.lazy(() => import('./pages/Person'));
const Today = React.lazy(() => import('./pages/Today'));

const getDefaultTheme = () =>
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

function App() {
    const [themeType, setThemeType] = React.useState(getDefaultTheme());
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
                    <React.Suspense fallback={<Loading />}>
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
                    </React.Suspense>
                </Router>
            </GeistProvider>
        </JssProvider>
    );
}

export default App;
