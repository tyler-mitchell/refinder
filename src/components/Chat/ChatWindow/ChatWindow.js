import React, { Suspense } from "react";
import ChatSettings from "components/Chat/ChatSettings";
import ChatBar from "components/Chat/ChatBar";
import ChatDialog from "components/Chat/ChatDialog";

import { Container, Grid, makeStyles, Box } from "@material-ui/core";
import ChatContextProvider from "../ChatContext";
import {
  Root,
  Header,
  Content,
  Sidebar,
  SecondaryInsetSidebar,
  InsetContainer,
  Footer,
  ConfigGenerator
} from "@mui-treasury/layout";
import useStyles from "./ChatWindow.styles";

// const ChatDialog = React.lazy(() => import("../ChatDialog"));
const ChatWindow = () => {
  const styles = useStyles();
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
      <ChatContextProvider>
        <InsetContainer className={styles.contentContainer}>
          <div
            ref={dialogRef}
            style={{
              overflowY: "auto",
              height: dialogHeight
            }}
          >
            {/* <Content className={styles.content}> */}
            {/* <Suspense fallback={<div>loading</div>}> */}
            <ChatDialog />
            {/* </Suspense> */}
            {/* </Content> */}
          </div>

          <SecondaryInsetSidebar
            className={styles.insetSidebar}
            BodyProps={{ className: styles.insetBody }}
            PaperProps={{ classes: { root: styles.insetDrawerPaper } }}
          >
            <ChatSettings />
          </SecondaryInsetSidebar>
        </InsetContainer>
        <InsetContainer></InsetContainer>

        <Footer className={styles.footer}>
          <ChatBar />
        </Footer>
      </ChatContextProvider>
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
