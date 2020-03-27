import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

import palette from "./palette";
import typography from "./typography";
import overrides from "./overrides";
import props from "./props";

const theme = responsiveFontSizes(
  createMuiTheme({
    palette,
    typography,
    overrides,
    props,
    zIndex: {
      appBar: 1200,
      drawer: 1100
    }
  }),
  { disableAlign: false }
);

export default theme;
