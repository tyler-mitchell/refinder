import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import StarIcon from "@material-ui/icons/Star";
import Search from "@material-ui/icons/Search";
import Edit from "@material-ui/icons/Edit";
import ThumbUp from "@material-ui/icons/ThumbUp";
import FormatPaint from "@material-ui/icons/FormatPaint";
import useStyles from "./SellerCard.styles";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setActiveProductChatId } from "redux/productSlice";
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
        className: cx(styles.settingIcon, blue && styles.blue),
      })}
    </Box>
  );
};

const SellerCard = ({ name, avatar, isOwner }) => {
  const styles = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <Box
        p={"14px 14px 16px 14px"}
        textAlign={"center"}
        display="flex"
        flexDirection="column"
        alignContent="center"
      >
        <Avatar
          className={styles.avatar}
          src={avatar || "https://i.pravatar.cc/300?img=13"}
        />
        <Typography
          className={styles.name}
          variant={"h1"}
          align={"center"}
          style={{ fontFamily: "Inter", fontWeight: 700 }}
          gutterBottom
        >
          {name}
        </Typography>
        <Box mb={2}>
          <StarIcon
            style={{
              color: "#FFCA28",
              marginRight: "7px",
              verticalAlign: "middle",
              alignItems: "center",
              position: "relative",
            }}
          />

          <Typography
            color="textSecondary"
            display="inline"
            // style={{ display: "inline-block" }}
            // variant={"subtitle2"}
          >
            <span style={{ fontWeight: 490 }}>
              4.8
              <Box px="2px" fontWeight={430} display="inline">
                {"/"}
              </Box>
              5
            </span>
          </Typography>
          {"    "}
          <Typography
            color="textSecondary"
            display="inline"
            style={{ fontWeight: 260 }}
            // variant={"subtitle2"}
          >
            (6)
          </Typography>
        </Box>
        {isOwner ? (
          <Button
            color="primary"
            variant="contained"
            style={{ textTransform: "none", marginBottom: "10px" }}
            onClick={() => {
              navigate("/marketplace/selling");
            }}
          >
            View Offers
          </Button>
        ) : (
          <Button
            color="primary"
            variant="contained"
            style={{ textTransform: "none", marginBottom: "10px" }}
            onClick={() => {
              navigate("discussion");
            }}
          >
            Make Offer
          </Button>
        )}
        {isOwner ? (
          <Button
            // color="primary"
            variant="outlined"
            style={{ textTransform: "none", opacity: 0.7 }}
            onClick={() => {
              // navigate("");
            }}
          >
            <Typography color="textSecondary" style={{ fontWeight: 550 }}>
              Mark as Sold
            </Typography>
          </Button>
        ) : (
          <Button
            // color="primary"
            variant="outlined"
            style={{ textTransform: "none", opacity: 0.7 }}
            onClick={() => {
              navigate("discussion");
            }}
          >
            <Typography color="textSecondary" style={{ fontWeight: 550 }}>
              Contact Seller
            </Typography>
          </Button>
        )}
      </Box>
      {/* <Divider /> */}
      {/* <SettingHeader opened>Options</SettingHeader>
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
      <SettingHeader>Shared Photos</SettingHeader> */}
    </div>
  );
};

export default SellerCard;
