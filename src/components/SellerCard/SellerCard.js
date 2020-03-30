import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Search from "@material-ui/icons/Search";
import Edit from "@material-ui/icons/Edit";
import ThumbUp from "@material-ui/icons/ThumbUp";
import FormatPaint from "@material-ui/icons/FormatPaint";
import useStyles from "./SellerCard.styles";

const SettingHeader = ({ children, opened }) => {
  const styles = useStyles();
  return (
    <Box
      p={"14px"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      className={styles.settingHeader}
    >
      <Typography className={styles.settingHead}>{children}</Typography>
      {opened ? <KeyboardArrowDown /> : <KeyboardArrowLeft />}
    </Box>
  );
};

const Setting = ({ label, icon, blue }) => {
  const styles = useStyles();
  return (
    <Box
      height={"44px"}
      pl={"14px"}
      pr={"12px"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Typography variant={"body2"}>{label}</Typography>
      {React.cloneElement(icon, {
        className: cx(styles.settingIcon, blue && styles.blue)
      })}
    </Box>
  );
};

const ChatSettings = () => {
  const styles = useStyles();
  return (
    <div>
      <Box p={"14px 14px 16px 14px"} textAlign={"center"}>
        <Avatar
          className={styles.avatar}
          src={"https://i.pravatar.cc/300?img=13"}
        />
        <Typography className={styles.name} variant={"h1"} align={"center"}>
          Imaad Casey
        </Typography>
      </Box>
      <Divider />
      <SettingHeader opened>Options</SettingHeader>
      <Box pb={2}>
        <Setting label={"Search in Conversation"} icon={<Search />} />
        <Setting label={"Edit Nicknames"} icon={<Edit />} />
        <Setting label={"Change Theme"} icon={<FormatPaint />} blue />
        <Setting label={"Change Emoji"} icon={<ThumbUp />} blue />
      </Box>
      <Divider />
      <SettingHeader>Privacy & Support</SettingHeader>
      <Divider />
      <SettingHeader>Shared files</SettingHeader>
      <Divider />
      <SettingHeader>Shared Photos</SettingHeader>
    </div>
  );
};

export default ChatSettings;
