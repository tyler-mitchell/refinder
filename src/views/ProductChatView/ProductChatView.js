import React from "react";
import { Toolbar, CssBaseline, Typography } from "@material-ui/core";
import MaterialMap from "components/Map";
import ChatWindow from "components/Chat";
import { useParams, useLocation } from "react-router-dom";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { database } from "firebase/core";
const ProductChatView = () => {
  // let { materialID } = useParams();
  // const productRef = database.doc(`materials/${materialID}`);
  // const [product, loading, error] = useDocumentData(productRef);
  const location = useLocation();

  console.log(`⭐: ProductChatView -> location`, location);
  // console.log(`⭐: ProductChatView -> product`, product);
  return (
    // !loading && (
    <>
      <ChatWindow />
    </>
    // )
  );
};

export default ProductChatView;
