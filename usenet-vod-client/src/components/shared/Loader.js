import React from 'react';
import clsx from 'clsx';
import { makeStyles, CircularProgress, Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  fullPage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loader: {
    width: '100%',
    padding: 10,
  },
}));

export default function Loader({ fullPage }) {
  const cls = useStyles();
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={clsx(cls.loader, { [cls.fullPage]: fullPage })}
    >
      <CircularProgress />
    </Grid>
  );
}
