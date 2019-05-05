import React from 'react';
import { Button, Typography, withStyles } from '@material-ui/core';
import styles from './styles';
import funFacts from '../../data/funfacts.json';
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';

class LinearBuffer extends React.Component {
  state = {
    completed: 0,
    buffer: 10,
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    if (completed > 100) {
      this.setState({ completed: 0, buffer: 10 });
    } else {
      const diff = Math.random() * 10;
      const diff2 = Math.random() * 10;
      this.setState({ completed: completed + diff, buffer: completed + diff + diff2 });
    }
  };
  


  render() {
    const { classes } = this.props;
    const { completed, buffer } = this.state;

    return (
      <div className={classes.root}>
      
        <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} />
      </div>
    );
  }
}

LinearBuffer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearBuffer);