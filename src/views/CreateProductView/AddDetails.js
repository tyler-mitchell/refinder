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
import { FormContext } from "./FormContext";
const AddDetail = () => {
  const dispatch = useDispatch();
  const formData = useSelector((s) => s.auth.uid);
  function onSubmit(values) {
    dispatch(addToForm({ formData: values }));
    console.log(`⭐: CreateProductView -> formData`, formData);
    dispatch(addToFirebase(formData));
  }
  const {
    handleSubmit,
    errors,
    register,
    formState,
    control,
  } = React.useContext(FormContext);

  const location = useLocation();

  return (
    <div style={{ width: "100%" }}>
      <ThemeProvider theme={theme}>
        <CSSReset />

        <SimpleGrid columns={1} spacingX={1} spacingY={4}>
          <FormControl isInvalid={errors.name} isRequired>
            <FormLabel>What's the product name?</FormLabel>
            <Input
              autoComplete="off"
              name="title"
              ref={register({ required: true })}
            />

            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="description">
              Describe the product in detail
            </FormLabel>
            <Textarea name="description" ref={register({ required: true })} />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>

          <Controller
            name="type"
            control={control}
            as={
              <CheckboxGroup variantColor="green">
                <SimpleGrid columns={2} spacingX={1} spacingY={1}>
                  <Checkbox value="tile">Tile</Checkbox>
                  <Checkbox value="brick">Brick</Checkbox>
                  <Checkbox value="glass">Glass</Checkbox>
                  <Checkbox value="wood">Wood</Checkbox>
                  <Checkbox value="concrete">Concrete</Checkbox>
                  <Checkbox value="metal">Metal</Checkbox>
                </SimpleGrid>
              </CheckboxGroup>
            }
          />
        </SimpleGrid>
      </ThemeProvider>
    </div>
  );
};

export default AddDetail;
