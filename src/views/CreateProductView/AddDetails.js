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
  InputGroup,
  Flex,
  Button,
  FormHelperText,
  InputLeftElement,
  InputRightElement,
  Stack,
  Icon,
  Heading,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Radio,
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
            <InputGroup ref={register({ required: true })}>
              <InputLeftElement
                color="gray.300"
                fontSize="1.2em"
                children="$"
              />
              <Input name="price" placeholder="Enter amount" />
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
