import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SearchBar from 'components/shared/SearchBar';
import { Container, makeStyles } from '@material-ui/core';
import PopularShows from './PopularShows';
import SeriesDialog from 'components/pages/SeriesModal';

const useStyles = makeStyles(theme => ({
  poster: { width: 200 },
  container: { paddingBottom: 5 },
  page: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64,
    },
    paddingTop: 56,
    paddingBottom: 56,
  },
}));

export default function TVShowsPage() {
  const cls = useStyles();

  return (
    <div className={cls.page}>
      <SearchBar title="TV Shows" />
      <Container className={cls.container}>
        <PopularShows />
      </Container>

      <Switch>
        <Route path="/tv/show/:id" component={SeriesDialog} />
      </Switch>
    </div>
  );
}
