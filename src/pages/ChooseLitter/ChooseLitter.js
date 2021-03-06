import React, { useState } from 'react';
import {
  withStyles,
  Grid,
  Typography,
  Grow,
  Slide,
  Modal
} from '@material-ui/core';

import litterData from '../../data/litter.json';
import LitterButton from '../../components/LitterButton';
import styles from './styles';

const ChooseLitter = function({ classes }) {
  if (localStorage.getItem('unlockedItems') === null) {
    localStorage.setItem('unlockedItems', ['Aluminum']);
  }
  const litterStorage = litterData.litter;
  const litterNames = Object.keys(litterStorage);

  const [litterState] = useState(true);

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justify="center"
      className={classes.container}
    >
      <Grid item xs={12} sm={12} md={4} className={classes.item}>
        <Slide in={litterState} direction="right">
          <Typography variant="h2">Choose a litter.</Typography>
        </Slide>
      </Grid>

      {litterNames.map(name => (
        <Grow
          key={name}
          in={litterState}
          style={{ transformOrigin: '0 0 0' }}
          {...(litterState ? { timeout: 1700 } : {})}
        >
          <Grid item xs={12} sm={12} md={3} className={classes.item}>
            <LitterButton litter={litterStorage[name]} name={name} />
          </Grid>
        </Grow>
      ))}
    </Grid>
  );
};

export default withStyles(styles)(ChooseLitter);
