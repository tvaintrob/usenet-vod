import React, { Fragment } from 'react';
import { useLocation } from 'react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import TVIcon from '@material-ui/icons/Tv';
import SettingsIcon from '@material-ui/icons/Settings';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import NavigationTabs from 'components/shared/Navigation/NavigationTabs';
import MoviesPage from 'components/pages/Movies';
import TVShowsPage from 'components/pages/TVShows';
import SettingsPage from 'components/pages/Settings';

export default function Navigation() {
  const location = useLocation();
  const tabs = {
    'TV Shows': { path: '/tv', icon: <TVIcon /> },
    Movies: { path: '/movies', icon: <LocalMoviesIcon /> },
    Settings: { path: '/settings', icon: <SettingsIcon /> },
  };

  return (
    <Fragment>
      <Switch>
        <Route path="/tv" component={TVShowsPage} />
        <Route path="/movies" component={MoviesPage} />
        <Route path="/settings" component={SettingsPage} />
        <Redirect to="/tv" />
      </Switch>

      <NavigationTabs tabs={Object.entries(tabs)} value={location.pathname} />
    </Fragment>
  );
}
