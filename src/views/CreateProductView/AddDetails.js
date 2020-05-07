import {
  Button,
  Checkbox,
  CheckboxGroup,
  CSSReset,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Textarea,
  theme,
  ThemeProvider,
} from "@chakra-ui/core";
import { Button as MuiButton } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import ImageInput from "components/ImageAttachment";
import DropZone from "components/ImageAttachment/DropZone";
import {
  addToFirebase,
  addToForm,
  formDataSelector,
} from "redux/createProductSlice";

import { FormContext } from "./FormContext";

const CustomRadio = React.forwardRef((props, ref) => {
  const { isChecked, isDisabled, value, ...rest } = props;
  return (
    <Button
      ref={ref}
      variantColor={isChecked ? "red" : "gray"}
      aria-checked={isChecked}
      role="radio"
      isDisabled={isDisabled}
      {...rest}
    />
  );
});

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

          <FormControl>
            <FormLabel htmlFor="price">What is the price?</FormLabel>
            <InputGroup>
              {/* <Input
                name="price"
                type="number"
                placeholder="Enter amount"
                ref={register({ required: true, min: 0 })}
              /> */}
              <InputLeftAddon
                // color="gray.300"
                fontSize="1.2em"
                children="$"
                fontWeight="medium"
                // children="$"
              />
              <NumberInput clampValueOnBlur={false}>
                <NumberInputField
                  roundedLeft={0}
                  min={0}
                  ref={register({ required: true })}
                  name="price"
                />
              </NumberInput>
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description">
              What type of material is it?
            </FormLabel>
            <Controller
              name="type"
              control={control}
              ref={register({ required: true })}
              as={
                <RadioGroup
                  ref={register({ required: true })}
                  value=""
                  isInline
                  style={{ justifyContent: "center" }}
                >
                  <Radio
                    style={{
                      padding: 10,
                      borderRadius: "5px",
                      fontWeight: 600,
                    }}
                    mb="10px"
                    bg="yellow.600"
                    color="white"
                    size="lg"
                    value="wood"
                  >
                    Wood
                  </Radio>
                  <Radio
                    style={{
                      padding: 10,
                      borderRadius: "5px",
                      fontWeight: 600,
                    }}
                    mb="10px"
                    bg="blue.600"
                    color="white"
                    size="lg"
                    value="tile"
                  >
                    Tile
                  </Radio>
                  <Radio
                    style={{
                      padding: 10,
                      borderRadius: "5px",
                      fontWeight: 600,
                    }}
                    bg="red.600"
                    mb="10px"
                    size="lg"
                    color="white"
                    value="brick"
                  >
                    Brick
                  </Radio>
                  <Radio
                    style={{
                      padding: 10,
                      borderRadius: "5px",
                      fontWeight: 600,
                    }}
                    bg="cyan.400"
                    size="lg"
                    mb="10px"
                    color="white"
                    value="glass"
                  >
                    Glass
                  </Radio>
                  <Radio
                    style={{
                      padding: 10,
                      borderRadius: "5px",
                      fontWeight: 600,
                    }}
                    bg="gray.400"
                    mb="10px"
                    size="lg"
                    color="white"
                    value="concrete"
                  >
                    Concrete
                  </Radio>
                  <Radio
                    style={{
                      padding: 10,
                      borderRadius: "5px",
                      fontWeight: 600,
                    }}
                    bg="gray.600"
                    color="white"
                    mb="10px"
                    size="lg"
                    value="metal"
                  >
                    Metal
                  </Radio>
                </RadioGroup>
              }
            />
          </FormControl>
        </SimpleGrid>
      </ThemeProvider>
    </div>
  );
};

export default AddDetail;
