import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  MobileStepper,
  Paper,
  Typography,
  Button
} from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { Link } from 'react-router-dom';

import styles from './styles';

const tutorialSteps = [
  {
    label:
      "By not recycling aluminum, it'll have to be remade from scratch. That means it'll have to be mined again from bauxite ore.",
    imgPath: '../miningbackground.png'
  },
  {
    label:
      'The mining causes deforestation, erosion, polluted water sources and a threat to animal life.',
    imgPath: '../deforestationbackground.jpeg'
  },
  {
    label:
      "There is no limit to how many times aluminum can be recycled! That's why recycling aluminum is such a boom for the environment. As a 'sustainable metal', it can be recycled again and again with no loss of material.",
    imgPath: '../recyclebackground3.jpg'
  },
  {
    label: "Don't throw out your aluminum cans! Always recycle them.",
    imgPath: '../compostbackground.PNG'
  }
];

class TextMobileStepper extends Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1
    }));
  };

  render() {
    const { classes, theme, litter, name } = this.props;
    const { activeStep } = this.state;
    const maxSteps = tutorialSteps.length;

    return (
      <div className={classes.root}>
        <Paper square elevation={0} className={classes.header}>
          <Typography className={classes.label} variant="h4">
            {tutorialSteps[activeStep].label}
          </Typography>
        </Paper>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {tutorialSteps.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <img
                  className={classes.img}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </SwipeableViews>

        {activeStep === 3 ? (
          <div className={classes.buttonContainer}>
            <Button
              variant="outlined"
              className={classes.buttonEnd}
              component={Link}
              to="/choose-litter"
              // variant="contained"
              color="primary"
            >
              Return to Litter
            </Button>
            <Button
              variant="outlined"
              className={classes.buttonEnd}
              component={Link}
              to={{
                pathname: '/choose-method',
                state: {
                  litter: litter,
                  name: name
                }
              }}
              // variant="contained"
              color="primary"
            >
              Throw it Elsewhere
            </Button>
          </div>
        ) : null}

        {/* {activeStep != 3 ? ( */}
        <MobileStepper
          variant="progress"
          color="default"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button
              variant="contained"
              color="secondary"
              className={classes.stepBtn}
              size="large"
              onClick={this.handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              variant="contained"
              color="secondary"
              className={classes.stepBtn}
              size="large"
              onClick={this.handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
        {/* ) : null} */}
      </div>
    );
  }
}

TextMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(TextMobileStepper);
