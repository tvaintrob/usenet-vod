import React from 'react';
import clsx from 'clsx';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  round: { borderRadius: 4 },
  image: { width: '100%', height: 'auto', display: 'block' },
  clickable: {
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      transition: 'all .1s',
      '&:hover': {
        zIndex: 1,
        transform: 'scale(1.15)',
      },
    },
  },
}));

export default function Poster({ src, clickable, className, onClick }) {
  const cls = useStyles();

  return (
    <Box
      onClick={onClick || (() => null)}
      boxShadow={2}
      className={clsx(cls.round, className, { [cls.clickable]: clickable })}
    >
      <img src={src} alt="poster" className={clsx(cls.round, cls.image)} />
    </Box>
  );
}
