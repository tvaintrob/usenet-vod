import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Typography, makeStyles } from '@material-ui/core';
import Loader from 'components/shared/Loader';

const useStyles = makeStyles(() => ({
  title: { marginBottom: 15, marginTop: 20 },
}));

export default function MediaScroller({
  title,
  items,
  fetchMore,
  hasMore,
  render,
}) {
  const cls = useStyles();

  return (
    <div className={cls.root}>
      <Typography variant="h6" className={cls.title}>
        {title}
      </Typography>
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchMore}
        loader={<Loader key="loader" />}
        hasMore={hasMore}
        threshold={50}
      >
        {render(items)}
      </InfiniteScroll>
    </div>
  );
}
