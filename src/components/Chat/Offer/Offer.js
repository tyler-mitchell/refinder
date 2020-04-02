import React from "react";
import cx from "clsx";
import {
  Typography,
  makeStyles,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider
} from "@material-ui/core";
const useOverShadowStyles = {
  root: ({ inactive }) => ({
    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    transition: "0.3s",
    ...(!inactive && {
      "&:hover": {
        transform: "translateY(2px)",
        boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)"
      }
    })
  })
};

const useStyles = makeStyles(() => ({
  overline: {
    display: "block",
    textAlign: "center",
    color: "#9e9e9e",
    letterSpacing: "2px",
    fontSize: 14,
    marginTop: 0
  },
  heading: {
    textAlign: "center",
    fontSize: 26,

    lineHeight: 1,
    fontWeight: 600,
    fontFamily:
      // eslint-disable-next-line max-len
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    // marginBottom: "0.72em",
    "&:after": {
      // content: '""',
      // width: 24,
      // height: 2,
      // backgroundColor: "#ddd",
      // display: "block",
      // // margin: "8px auto",
      // borderRadius: 2
    }
  },
  body: {
    textAlign: "center",
    fontSize: 14,
    color: "#222",
    lineHeight: 1.75,
    width: "88%",
    margin: "0 auto"
  },
  root: {
    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    width: "200px",
    height: "108px"
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center"
    // borderRadius: "45px 25px 8px 45px"
  }
}));

const Offer = ({ price, overline, classes }) => {
  const styles = useStyles();
  // const shadowStyles = useOverShadowStyles({ inactive: true });
  return (
    <Card className={cx(styles.root)}>
      <CardContent style={{ paddingBottom: 0 }}>
        {overline && (
          <Typography
            component={"span"}
            // {...overlineProps}
            className={cx(styles.overline)}
          >
            {overline}
          </Typography>
        )}
        <Typography
          component={"h4"}
          // {...headingProps}
          className={cx(styles.heading)}
          gutterBottom
        >
          {/* {heading} */}
          {price}
        </Typography>
        {/* <Typography {...bodyProps} className={cx(styles.body, bodyProps.className)}>
          {body}
        </Typography> */}
      </CardContent>
      <Divider />
      <CardActions style={{ padding: 0, marginBottom: 0 }}>
        <Button style={{ width: "100%" }}>Accept</Button>
      </CardActions>
    </Card>
  );
};

export default Offer;
