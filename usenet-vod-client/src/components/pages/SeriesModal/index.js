import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useGlobalState } from "components/GlobalState";
import { fetchShowDetails } from "services/tvshows";
import Loader from "components/shared/Loader";
import MediaDialog from "components/shared/MediaDialog";
import Poster from "components/shared/Poster";
import { makeStyles, Grid, Chip, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  poster: {
    width: 150,
    marginTop: 20
  },
  genre: { margin: "20px 5px" },
  overview: { textAlign: "center" }
}));

function useShowDetails(id) {
  const [showsDetails, setShowsDetails] = useGlobalState("shows.details", {});
  const [currentShow, setCurrentShow] = useState(showsDetails[id]);

  if (currentShow) {
    return [currentShow, false];
  }

  fetchShowDetails(id).then(res => {
    setShowsDetails({ ...showsDetails, [id]: res });
    setCurrentShow(res);
  });

  return [currentShow, true];
}

export default function SeriesDialog() {
  const cls = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [showDetails, isLoading] = useShowDetails(id);

  const dialogContent = () => {
    const imageUrl = `https://image.tmdb.org/t/p/w185/${showDetails.poster_path}`;
    return (
      <Grid container direction="column" alignItems="center">
        <Poster src={imageUrl} className={cls.poster} />
        <div>
          {showDetails.genres.slice(0, 3).map(g => (
            <Chip
              label={g.name.split("&")[0].trim()}
              key={g.id}
              className={cls.genre}
              color="primary"
            />
          ))}
        </div>
        <Typography variant="caption" className={cls.overview}>
          {showDetails.overview}
        </Typography>
      </Grid>
    );
  };

  return (
    <MediaDialog
      title={isLoading ? "Loading..." : showDetails.name}
      onExited={history.goBack}
    >
      {isLoading ? <Loader fullPage /> : dialogContent()}
    </MediaDialog>
  );
}
