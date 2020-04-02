import React from "react";

import { IconButton, InputBase, Box } from "@material-ui/core";

import {
  Search as InfoOutlined,
  StarBorder,
  ChevronLeft as ArrowLeft,
  ChevronRight as ArrowRight
} from "@material-ui/icons";

const useChromeInputStyles = () => {
  const space = "200px"; // default = 8;
  const backgroundColor = "#F1F3F4";
  const borderRadius = 100; // rounded
  const inputPadding = space / 4;
  return {
    root: {
      backgroundColor,
      borderRadius,
      padding: inputPadding
    },
    icon: {
      padding: `${space / 2}px ${space}px`,
      borderRadius
    }
  };
};

const SearchBar = () => {
  const styles = useChromeInputStyles();
  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
      // mt="30px"
      // mb="30px"
    >
      <Box bgcolor="#F1F3F4" width="600px" borderRadius="10px" textAlign="left">
        <InputBase
          classes={styles}
          placeholder={"Search for materials..."}
          startAdornment={
            <IconButton className={styles.icon}>
              <InfoOutlined />
            </IconButton>
          }
        />
      </Box>
    </Box>
  );
};

export default SearchBar;
