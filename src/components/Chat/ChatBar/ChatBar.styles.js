import { makeStyles } from "@material-ui/core";
export default makeStyles(() => ({
  icon: {
    color: "rgb(0, 153, 255)",
    width: 44,
    height: 44,
    padding: 6,
    "&:not(:first-child)": {
      marginLeft: 4
    }
  },
  input: {
    flex: "auto",
    borderRadius: 40,
    paddingLeft: 16,
    backgroundColor: "rgba(0,0,0,0.04)",
    margin: "0 8px",
    height: 36,
    fontSize: 13
  }
}));
