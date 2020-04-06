import React from "react";

import { Button as MuiButton } from "@material-ui/core";
import {
  ThemeProvider,
  CSSReset,
  theme,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Flex,
  Button,
  FormHelperText,
  Heading,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/core";
import {
  addToForm,
  formDataSelector,
  addToFirebase,
} from "redux/createProductSlice";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import ImageInput from "components/ImageAttachment";
import DropZone from "components/ImageAttachment/DropZone";

const AddDetail = () => {
  const dispatch = useDispatch();
  const formData = useSelector((s) => s.auth.uid);
  function onSubmit(values) {
    dispatch(addToForm({ formData: values }));
    console.log(`⭐: CreateProductView -> formData`, formData);
    dispatch(addToFirebase(formData));
  }
  const { handleSubmit, errors, register, formState, control } = useForm();

  const location = useLocation();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DropZone />
    </form>
  );
};

export default AddDetail;
