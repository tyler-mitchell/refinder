import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  header: {
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, .10)",
    backgroundColor: "#ffffff"
  },
  insetBody: {
    borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
    overflowY: "auto"
  },
  insetDrawerPaper: {
    width: "100%"
    // maxWidth: 300
  },
  contentContainer: {
    // flex: 1,
    minHeight: 0,
    height: "500px",
    borderRadius: "10px"
  },
  content: {
    maxHeight: "100%",
    overflowY: "auto"
  },
  footer: {
    height: 52,
    display: "flex",

    alignItems: "center",
    border: "none",
    padding: "0 8px"
  },
  edit: {
    backgroundColor: "rgba(0,0,0,0.04)"
  }
}));
