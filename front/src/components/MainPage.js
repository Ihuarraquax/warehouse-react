import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/featured/?work)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '600px',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',

  },
  mainFeaturedPostContent: {
    position: 'relative',
    textAlign: 'center',
    padding: theme.spacing(3),
  },
}));
export default function MainPage() {
  const classes = useStyles();
  
  return (
    <div>
      <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `/public/magazyn.jpg)` }}>
      {/* Increase the priority of the hero background image */}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={12}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              niezły magazyn
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              kochamy magazyny i widłowe wózki
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
    </div>
  )
}
