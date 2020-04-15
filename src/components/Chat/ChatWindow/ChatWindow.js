import React, { Suspense } from "react";
import ChatSettings from "components/Chat/ChatSettings";
import ChatBar from "components/Chat/ChatBar";
import ChatDialog from "components/Chat/ChatDialog";
import { useNavigate } from "react-router";
import {
  Container,
  Grid,
  makeStyles,
  Box,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import ChatContextProvider from "../ChatContext";
import {
  Root,
  Header,
  Content,
  Sidebar,
  SecondaryInsetSidebar,
  InsetContainer,
  Footer,
  ConfigGenerator,
} from "@mui-treasury/layout";
import useStyles from "./ChatWindow.styles";

// const ChatDialog = React.lazy(() => import("../ChatDialog"));
const ChatWindow = () => {
  const styles = useStyles();
  let navigate = useNavigate();
  const dialogRef = React.createRef();
  const [dialogHeight, setDialogHeight] = React.useState(0);
  React.useLayoutEffect(() => {
    // componentDidMount(), componentDidUpdate()

    if (dialogRef.current) {
      setDialogHeight(`calc(100vh - ${dialogRef.current?.offsetTop}px )`);

      console.log(
        `⭐: ChatWindow -> dialogRef.current`,
        (dialogRef.current.scrollTop = dialogRef.current.scrollHeight)
      );
      dialogRef.current.scrollTop = dialogRef.current.scrollHeight;
    }
    // effect dependency array
  }, [dialogRef.current]);
  const frameRef = React.createRef();
  return (
    <>
      <InsetContainer
        className={styles.contentContainer}
        style={{ background: "#f8f8f7" }}
      >
        <ChatDialog />
        <div className={styles.footer}></div>
      </InsetContainer>
      <Footer className={styles.footer}>
        <ChatBar />
      </Footer>
    </>
  );
};

{
  /* <Grid container>
<Grid item>
  <ChatDialog />
  <Grid container item>
    <ChatSettings />
  </Grid>
</Grid>
<Grid item>
  <ChatBar />
</Grid>
</Grid> */
}
export default ChatWindow;
