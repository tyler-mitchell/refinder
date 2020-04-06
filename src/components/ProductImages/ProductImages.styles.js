import { makeStyles } from "@material-ui/core";
export default makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 300,
    maxWidth: 400,
    width: 400,
    borderRadius: "8px",
    overflow: "hidden",
    objectFit: "cover",
    display: "block",
    // width: "100%",
  },
  stepperImgs: {
    userSelect: "none",
    width: "100%",
    maxWidth: "80px",
    objectFit: "cover",
    height: "60px",
    borderRadius: "8px",
  },
}));
