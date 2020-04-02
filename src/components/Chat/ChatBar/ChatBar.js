import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";

import Input from "@material-ui/core/Input";
import AddCircle from "@material-ui/icons/AddCircle";
import Gif from "@material-ui/icons/Gif";
import Image from "@material-ui/icons/Image";
import Note from "@material-ui/icons/Note";
import ThumbUp from "@material-ui/icons/ThumbUp";
import SendIcon from "@material-ui/icons/SendRounded";
import { useForm, Controller } from "react-hook-form";
import useStyles from "./ChatBar.styles";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "redux/productSlice";

const ChatBar = ({ concise }) => {
  const dispatch = useDispatch();
  const success = useSelector(s => s.product);
  const styles = useStyles();
  const { reference, handleSubmit, reset, control } = useForm();
  function onSubmit(data, e) {
    console.log(`⭐: onSubmit -> d`, data);
    dispatch(sendMessage(data));
    reset();
  }

  return (
    <>
      <AddCircle className={styles.icon} />
      {/* {!concise && (
        <>
          <Gif className={styles.icon} />
          <Note className={styles.icon} />
          <Image className={styles.icon} />
        </>
      )} */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%", position: "relative" }}
      >
        <Controller
          as={InputBase}
          className={styles.input}
          defaultValue=""
          control={control}
          placeholder={"Type a message..."}
          fullWidth
          autoComplete="off"
          name="message"
          endAdornment={
            <InputAdornment position={"end"}>
              <SendIcon className={styles.icon} />
            </InputAdornment>
          }
        />
      </form>
      {/* <ThumbUp className={styles.icon} /> */}
    </>
  );
};

export default ChatBar;
