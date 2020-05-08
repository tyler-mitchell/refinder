import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import React from "react";

import useStyles from "./ProductImages.styles.js";

export default function TextMobileStepper({ productImages }) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = productImages.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <img
        className={classes.img}
        style={{
          // maxWidth: "auto",

          maxHeight: "auto",
          width: "100%",
          objectFit: "cover",
        }}
        src={productImages[activeStep].downloadUrl}
        alt={activeStep}
      />
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        style={{ background: "white" }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />

      {/* <div style={{ display: "flex", justifyItems: "center", height: "90px" }}> */}
      <Grid container justify="center" spacing={1}>
        {productImages.map((im, i) => (
          <Grid item>
            <img
              src={im?.downloadUrl}
              alt={i}
              onClick={() => {
                setActiveStep(i);
              }}
              className={classes.stepperImgs}
              style={{
                opacity: activeStep === i ? 1 : 0.3,
              }}
            />
          </Grid>
        ))}
      </Grid>
      {/* </div> */}
    </div>
  );
}
