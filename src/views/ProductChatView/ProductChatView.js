import React from "react";

import MaterialMap from "components/Map";
import ChatWindow from "components/Chat";
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
import ChatContextProvider from "components/Chat/ChatContext";
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
import useStyles from "components/Chat/ChatWindow/ChatWindow.styles";

const ProductChatView = () => {
  // let { materialID } = useParams();
  // const productRef = database.doc(`materials/${materialID}`);
  // const [product, loading, error] = useDocumentData(productRef);
  const navigate = useNavigate();

  // console.log(`⭐: ProductChatView -> product`, product);
  return (
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
          {" "}
          <ChatWindow />
        </DialogContent>
      </Dialog>
    </ChatContextProvider>
  );
};

export default ProductChatView;
