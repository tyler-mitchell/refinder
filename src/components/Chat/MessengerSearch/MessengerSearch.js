import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import useStyles, { useAdornStyles } from "./MessengerSearch.styles";

const MessengerSearch = () => {
  const styles = useStyles();
  const adornStyles = useAdornStyles();
  return (
    <InputBase
      classes={styles}
      startAdornment={
        <InputAdornment position={"start"} classes={adornStyles}>
          <Search />
        </InputAdornment>
      }
      placeholder={"Search Messenger"}
    />
  );
};

export default MessengerSearch;
