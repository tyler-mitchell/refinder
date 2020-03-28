import { makeStyles } from "@material-ui/core";

export default makeStyles(({ palette }) => ({
  root: ({ active }) => ({
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 10,
    ...(active && {
      backgroundColor: "rgba(0, 0, 0, .05)"
    })
  }),
  rootHover: {
    "&:hover": {
      "& $dot": {
        display: "none"
      },
      "& $responded": {
        display: "none"
      },
      "& $more": {
        visibility: "visible"
      }
    }
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 12
  },
  primary: ({ bold }) => ({
    ...(bold && { fontWeight: "bold" })
  }),
  secondary: ({ bold }) => ({
    fontSize: 13,
    color: "#999",
    ...(bold && { fontWeight: "bold", color: palette.text.primary })
  }),
  float: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  dot: {
    width: 12,
    height: 12,
    backgroundColor: "#09f",
    borderRadius: "50%"
  },
  more: {
    visibility: "hidden",
    fontSize: 20
  },
  responded: {
    width: 16,
    height: 16
  }
}));