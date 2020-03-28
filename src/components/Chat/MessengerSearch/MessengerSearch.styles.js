import { makeStyles } from "@material-ui/core";
export const useAdornStyles = makeStyles(() => ({
  root: {
    paddingLeft: 12,
    "& svg": {
      color: "rgba(0,0,0,0.38)"
    }
  }
}));

export default makeStyles(() => ({
  root: {
    backgroundColor: "rgba(0, 0, 0, .04)",
    borderRadius: 40,
    width: "100%"
  },
  input: {
    boxSizing: "border-box",
    minHeight: 36
  }
}));
