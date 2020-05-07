import { makeStyles } from "@material-ui/core";

export default makeStyles(({ palette, spacing }) => {
  const radius = spacing(3.3);
  const size = 30;
  // const rightBgColor = palette.primary.main;
  const rightBgColor = "#09f";
  // if you want the same as facebook messenger, use this color '#09f'
  return {
    avatar: {
      width: size,
      height: size,
    },
    rightRow: {
      marginLeft: "auto",
    },
    msgBox: {
      display: "flex",
      alignItems: "center",
      marginBottom: 4,
      "&:hover $iconBtn": {
        opacity: 1,
      },
    },
    leftMsgBox: {
      textAlign: "left",
      paddingLeft: "0px",
    },
    rightMsgBox: {
      textAlign: "right",
      flexDirection: "row-reverse",
    },
    msg: {
      maxWidth: "70%",
      padding: spacing(1.3, 1),
      borderRadius: spacing(0.7),
      display: "inline-block",
      wordBreak: "break-word",
      // fontFamily:
      //   // eslint-disable-next-line max-len
      //   '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      fontSize: "14px",
      fontWeight: 445,
      // letterSpacing: "0.2px",
    },
    left: {
      borderTopRightRadius: radius,
      borderBottomRightRadius: radius,
      backgroundColor: palette.grey[100],
    },
    right: {
      borderTopLeftRadius: radius,
      borderBottomLeftRadius: radius,
      backgroundColor: rightBgColor,
      color: palette.common.white,
      paddingRight: spacing(5),
      paddingLeft: spacing(3.3),
    },
    leftFirst: {
      borderTopLeftRadius: radius,
    },
    leftLast: {
      borderBottomLeftRadius: radius,
    },
    rightFirst: {
      borderTopRightRadius: radius + 2,
    },
    rightLast: {
      borderBottomRightRadius: radius + 2,
    },
    iconBtn: {
      opacity: 0,
      padding: 6,
      color: "rgba(0,0,0,0.34)",
      "&:hover": {
        color: "rgba(0,0,0,0.87)",
      },
      margin: "0 4px",
      "& svg": {
        fontSize: 20,
      },
    },
    image: {
      maxWidth: 120,
      height: 120,
      maxHeight: 120,
    },
  };
});
