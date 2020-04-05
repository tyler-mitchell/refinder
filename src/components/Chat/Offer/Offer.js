import React from "react";
import cx from "clsx";
import {
  Typography,
  makeStyles,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
} from "@material-ui/core";
const useOverShadowStyles = {
  root: ({ inactive }) => ({
    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    transition: "0.3s",
    ...(!inactive && {
      "&:hover": {
        transform: "translateY(2px)",
        boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
      },
    }),
  }),
};

const useStyles = makeStyles(() => ({
  overline: {
    display: "block",
    textAlign: "center",

    letterSpacing: "2px",
    fontSize: 14,
    fontFamily: "Work Sans",
    fontWeight: 510,
    marginTop: 0,
    marginBottom: 4,
  },
  heading: {
    textAlign: "center",
    fontSize: 24,

    lineHeight: 1,
    fontWeight: 450,
    opacity: 0.86,

    // marginBottom: "0.72em",
    "&:after": {
      // content: '""',
      // width: 24,
      // height: 2,
      // backgroundColor: "#ddd",
      // display: "block",
      // // margin: "8px auto",
      // borderRadius: 2
    },
  },
  body: {
    textAlign: "center",
    fontSize: 14,
    color: "#222",
    lineHeight: 1.75,
    width: "88%",
    margin: "0 auto",
  },
  root: {
    boxShadow: "0px 5px 20px rgba(34, 35, 58, 0.05)",
    width: "200px",
    height: "108px",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center"
  },
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
            color="textSecondary"
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
      <CardActions
        style={{
          padding: 0,
          color: "green",

          marginBottom: 0,
        }}
      >
        <Button
          variant="contained"
          color="inherit"
          style={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            width: "100%",
            color: "white",
            background: "lightgreen",
          }}
        >
          Accept
        </Button>
      </CardActions>
    </Card>
  );
};

export default Offer;
