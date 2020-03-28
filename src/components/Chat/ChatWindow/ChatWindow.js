import React from "react";
import ChatSettings from "components/Chat/ChatSettings";
import ChatBar from "components/Chat/ChatBar";
import ChatDialog from "components/Chat/ChatDialog";
import { Container, Grid, makeStyles } from "@material-ui/core";
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

const ChatWindow = () => {
  const styles = useStyles();
  return (
    <>
      <InsetContainer className={styles.contentContainer}>
        <Content className={styles.content}>
          <ChatDialog />
        </Content>
        <SecondaryInsetSidebar
          className={styles.insetSidebar}
          BodyProps={{ className: styles.insetBody }}
          PaperProps={{ classes: { root: styles.insetDrawerPaper } }}
        >
          <ChatSettings />
        </SecondaryInsetSidebar>
      </InsetContainer>
      <InsetContainer>
        <Footer className={styles.footer}>
          <ChatBar />
        </Footer>
      </InsetContainer>
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
