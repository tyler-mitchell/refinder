import React from "react";
import { useForm } from "react-hook-form";
export const FormContext = React.createContext();
const FormContextProvider = ({ children }) => {
  const {
    handleSubmit,
    triggerValidation,
    errors,
    register,
    formState,
    control,
  } = useForm();
  const ctx = {
    handleSubmit,
    triggerValidation,
    errors,
    register,
    formState,
    control,
  };
  return <FormContext.Provider value={ctx}>{children}</FormContext.Provider>;
};

export default FormContextProvider;
