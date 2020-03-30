import React from "react";
import { database } from "firebase/core";
import { useParams } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";

export const ChatContext = React.createContext();

const ChatContextProvider = ({ children }) => {
  const { materialID } = useParams();

  // const commentRef = database
  // .collection("materials")
  // .doc(materialID)
  // .collection("product_chat")
  // .orderBy("created");

  // const [commentsCollection, loadingIdeas, error] = useCollection(commentRef);
  // status: [approved, 8uou0980098]

  const ctx = {};

  return <ChatContext.Provider value={ctx}>{children}</ChatContext.Provider>;
};

export default ChatContextProvider;
