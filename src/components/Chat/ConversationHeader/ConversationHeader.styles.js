import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  container: {
    width: "100%",
  },
  root: {
    padding: "8px 8px 8px 16px",
  },
  primary: {
    fontWeight: "bold",
  },
  secondary: {
    fontSize: 12,
  },
  iconBtn: {
    "& svg": {
      color: "rgb(0, 153, 255)",
    },
  },
}));
