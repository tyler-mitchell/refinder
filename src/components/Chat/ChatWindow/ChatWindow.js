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
      <ChatContextProvider>
        <Dialog
          open={true}
          // onClose={handleClose}
          onClose={() => {
            navigate(-1);
          }}
          maxWidth="xl"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              borderRadius: "10px",
            },
          }}
        >
          <DialogContent style={{ width: "100%" }}>
            <InsetContainer
              className={styles.contentContainer}
              style={{ background: "#f8f8f7" }}
            >
              {/* <Box width="30%" /> */}
              {/* <div
                ref={dialogRef}
                style={{
                  overflowY: "auto",
                  height: dialogHeight,
                  width: "100%"
                }}
              > */}
              {/* <Content className={styles.content}> */}
              {/* <Suspense fallback={<div>loading</div>}> */}
              <ChatDialog />
              <div className={styles.footer}></div>

              {/* </Suspense> */}
              {/* </Content> */}
              {/* </div> */}

              {/* <SecondaryInsetSidebar
                className={styles.insetSidebar}
                BodyProps={{ className: styles.insetBody }}
                PaperProps={{ classes: { root: styles.insetDrawerPaper } }}
              >
                <ChatSettings />
              </SecondaryInsetSidebar> */}
            </InsetContainer>

            {/* <InsetContainer></InsetContainer> */}
            <Footer className={styles.footer}>
              {" "}
              <ChatBar />
            </Footer>
          </DialogContent>
        </Dialog>
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
