import { fade } from "@material-ui/core/styles";
import palette from "./palette";
export default {
  MuiInputBase: {
    root: {
      "label + &": {
        marginTop: "1.5em"
      }
    },
    inputMultiline: {
      padding: "10px 12px"
    },
    input: {
      borderRadius: 8,
      position: "relative",
      backgroundColor: "white",
      border: "1px solid #ced4da",
      fontSize: 16,

      padding: "10px 12px",
      // transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(","),
      "&:focus": {
        boxShadow: `${fade(palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: palette.primary.main
      }
    }
  },

  MuiFormLabel: {
    root: {
      color: palette.text.secondary,
      fontFamily: "'Open Sans', sans-serif",
      fontWeight: 600,
      fontSize: 18
    },
    asterisk: {
      color: "transparent"
    }
  }
};
