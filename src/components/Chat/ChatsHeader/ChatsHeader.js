import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Edit from "@material-ui/icons/Edit";
import SettingsApplications from "@material-ui/icons/SettingsApplications";
import React from "react";

const useStyles = makeStyles(() => ({
  middle: {
    flex: "auto",
    marginLeft: 16,
  },
  iconBtn: {
    padding: 8,
    backgroundColor: "rgba(0, 0, 0, .04)",
    "&:not(:last-child)": {
      marginRight: 16,
    },
  },
}));

const ChatsHeader = () => {
  const styles = useStyles();
  return (
    <Box py={"10px"} px={2} display={"flex"} alignItems={"center"}>
      <Typography variant={"h5"} className={styles.middle}>
        <b>Chats</b>
      </Typography>
      <IconButton className={styles.iconBtn}>
        <SettingsApplications />
      </IconButton>
      <IconButton className={styles.iconBtn}>
        <Edit />
      </IconButton>
    </Box>
  );
};

export default ChatsHeader;
