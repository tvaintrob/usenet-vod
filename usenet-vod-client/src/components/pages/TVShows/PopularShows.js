import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { fetchPopularShows } from 'services/tvshows';
import Series from 'components/pages/TVShows/Series';
import MediaScroller from 'components/shared/MediaScroller';
import { useGlobalState } from 'components/GlobalState';

function usePopularShows() {
  const [hasMore, setHasMore] = useState(true);
  const [shows, setShows] = useGlobalState('popularShows', []);

  const fetchShows = page => {
    console.log(`fetching page: ${page}`);
    return fetchPopularShows(page)
      .then(result => result.map(r => ({ ...r, page })))
      .then(result => [...shows, ...result])
      .then(result => result.sort((a, b) => a.page - b.page))
      .then(result => setShows(result))
      .then(() => setHasMore(page < 1000));
  };

  return [shows, fetchShows, hasMore];
}

export default function PopularShows() {
  const [shows, fetchMore, hasMore] = usePopularShows();

  return (
    <MediaScroller
      title="Popular on TMDb"
      items={shows}
      fetchMore={fetchMore}
      hasMore={hasMore}
      render={items => (
        <Grid container spacing={1} justify="center">
          {items.map((show, index) => (
            <Grid item xs={4} md={2} key={index}>
              <Series name={show.name} id={show.id} poster={show.poster_path} />
            </Grid>
          ))}
        </Grid>
      )}
    />
  );
}
