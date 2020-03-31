import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import { useTheme } from "@material-ui/core";

import clsx from "clsx";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import useField from "./useField";
import get from "./get";

const useStyles = makeStyles({
  root: {},
  hidden: { display: "none" }
});

function Field({
  xs, //ignored
  sm, //ignored
  md, //ignored
  lg, //ignored
  xl, //ignored
  hidden,
  hiddenErrorMessage,

  control: controlProp,
  max,
  min,
  name,
  maxLength,
  minLength,
  required,
  pattern,
  disabled,
  validate,
  helperText: helperTextProp,
  className,
  options,
  children,
  label,
  select = !!children || !!options,
  ...other
}) {
  const { control, error, rules } = useField({
    name,
    control: controlProp,
    disabled,
    max,
    min,
    maxLength,
    minLength,
    required,
    pattern,
    validate
  });

  const classes = useStyles();
  const isHidden = hidden || other.type === "hidden";

  return (
    <Controller
      fullWidth
      select={select}
      name={name}
      disabled={disabled}
      className={clsx(className, { [classes.hidden]: isHidden })}
      required={!!required}
      label={label ?? name}
      variant="filled"
      defaultValue={get(control.defaultValuesRef.current, name, "")}
      as={TextField}
      error={!!error}
      helperText={
        hiddenErrorMessage ? undefined : error?.message || helperTextProp
      }
      control={control}
      rules={rules}
      children={
        children ||
        options?.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))
      }
      {...other}
    />
  );
}

export default Field;
