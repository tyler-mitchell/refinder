import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {} from "redux/createProductSlice";
import {
  addToForm,
  formDataSelector,
  addToFirebase,
  setProductDocId,
  resetCreateProductState,
} from "redux/createProductSlice";
import fbMultiImageUpload from "firebase/fbMultiUpload";
import { useNavigate } from "react-router-dom";
export const FormContext = React.createContext();

const formSteps = [
  "General Details",
  "Upload Photos",
  "Location",
  "Price and Payment",
];

const TOTAL_STEPS = formSteps.length;

const FormContextProvider = ({ children }) => {
  const {
    handleSubmit,
    triggerValidation,
    errors,
    register,
    unregister,
    formState,
    setValue,
    control,
    getValues,
  } = useForm();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { productDocId, uploading, error, finished } = useSelector(
    (s) => s.createProduct
  );

  // TODO:
  // Make sure productID is reset after submission
  const [modalOpen, setModalOpen] = React.useState(true);
  React.useEffect(() => {
    if (!productDocId) {
      dispatch(setProductDocId());
    }
  }, []);

  React.useEffect(() => {
    if (finished) {
      dispatch(resetCreateProductState());
      setModalOpen(false);
    }
  }, [finished]);

  const [imageFiles, setImageFiles] = React.useState({});
  const [activeStep, setActiveStep] = React.useState(1);
  const formData = useSelector((s) => s.auth.uid);
  const [completedSteps, setCompletedSteps] = React.useState(0);

  function onSubmit(values) {
    if (activeStep < TOTAL_STEPS) {
      setActiveStep(activeStep + 1);
      setCompletedSteps(activeStep);
    }
    dispatch(addToForm({ formData: values }));

    console.log(`⭐: CreateProductView -> formData`, formData);

    if (activeStep === TOTAL_STEPS) {
      // getValues();
      fbMultiImageUpload(productDocId, imageFiles).then((productImages) => {
        dispatch(addToFirebase(productImages));
      });

      console.log(`⭐: onSubmit -> DISPATCHED FIREBASE`, activeStep);
    }
  }

  function handleFileUpload() {
    // setFileData(Object.keys(imageFiles).map((key) => imageFiles[key]));
  }
  const ctx = {
    handleSubmit,
    triggerValidation,
    handleFileUpload,
    errors,
    register,
    imageFiles,
    setImageFiles,
    unregister,
    setValue,
    formState,
    control,
    getValues,
    activeStep,
    setActiveStep,
    formSteps,
    completedSteps,
    onSubmit,
    error,
    uploading,
    modalOpen,
    setModalOpen,
  };
  return <FormContext.Provider value={ctx}>{children}</FormContext.Provider>;
};

export default FormContextProvider;
