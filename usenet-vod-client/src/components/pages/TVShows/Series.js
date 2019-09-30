import React from 'react';
import { useHistory } from 'react-router';
import { useTheme, useMediaQuery } from '@material-ui/core';
import Poster from 'components/shared/Poster';

export default function Series({ id, name, poster }) {
  const history = useHistory();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('sm'));

  const imageUrl = desktop
    ? `https://image.tmdb.org/t/p/w185/${poster}`
    : `https://image.tmdb.org/t/p/w154/${poster}`;

  return (
    <Poster
      onClick={() => history.push(`/tv/show/${id}`)}
      src={imageUrl}
      clickable
    />
  );
}
