import React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { Controller, useFormContext } from "react-hook-form";
import getErrorMessages from "./helpers/getErrorMessages";
import {
  Input,
  InputBase,
  FormControl,
  InputLabel,
  makeStyles
} from "@material-ui/core";

/**
 * Important: variant is not part of props due to nasty and un-resolvable. you can't use variant only as provider props
 *
 * See: https://github.com/mui-org/material-ui/issues/15697
 */
export default function TextFieldElement({
  validation = {},
  parseError,
  fullWidth,
  type,
  label,
  required,
  name,
  ...rest
}) {
  const { errors, control } = useFormContext();
  const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      flexWrap: "wrap"
    },
    margin: {
      margin: theme.spacing(1)
    }
  }));
  // const formValue: any = getNestedValue(getValues({ nest: true }), name)
  // const value = formValue || ''
  if (required) {
    validation.required = "This field is required";
  }
  if (type === "email") {
    validation.pattern = {
      // eslint-disable-next-line no-useless-escape
      value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "email"
    };
  }
  const errorMessages = getErrorMessages(name, errors, parseError);
  const classes = useStyles();
  return (
    <Controller
      required={required}
      name={name}
      control={control}
      rules={validation}
      as={
        <FormControl fullWidth={fullWidth}>
          <InputLabel shrink htmlFor={`${name}-input`}>
            {label}
          </InputLabel>
          <InputBase
            fullWidth={fullWidth}
            {...rest}
            type={type}
            id={`${name}-input`}
            error={!!errorMessages}
            helperText={errorMessages || rest.helperText}
          />
        </FormControl>
      }
    />
  );
}
