import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { useGlobalState } from 'components/GlobalState';
import { fetchShowDetails } from 'services/tvshows';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function useShowDetails(id) {
  const [showsDetails, setShowsDetails] = useGlobalState('shows.details');
  const [currentShow, setCurrentShow] = useState(showsDetails[id]);

  if (currentShow) {
    return [currentShow, false];
  }

  fetchShowDetails(id).then(res => setCurrentShow(res));
  return [null, true];
}

export default function SeriesDialog() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      onExited={history.goBack}
      transitionDuration={400}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar} color="default">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {id}
          </Typography>
        </Toolbar>
      </AppBar>
    </Dialog>
  );
}
