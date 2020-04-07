import React from "react";
import { useForm } from "react-hook-form";
import useFirebaseUpload from "firebase/firebaseStorage";
import { useSelector, useDispatch } from "react-redux";
import { setProductDocId, addToFirebase } from "redux/createProductSlice";
export const FormContext = React.createContext();

const FormContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const productDocId = useSelector((s) => s.createProduct.productDocId);
  React.useEffect(() => {
    if (!productDocId) {
      dispatch(setProductDocId());
    }
  }, []);
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
  const [imageFiles, setImageFiles] = React.useState({});
  const [
    { imgDataArr, data, isLoading, isError, progress, allDone },
    setFileData,
  ] = useFirebaseUpload({
    root: "product-images",
    fileName: "image1",
    folder: productDocId,
  });

  React.useState(() => {
    if (allDone) {
      console.log(`⭐: FormContextProvider -> allDone`, allDone);
      dispatch(addToFirebase("test"));
    }
  }, [allDone]);
  // console.log(`⭐: DropzoneComponent -> progress`, progress);
  // console.log(`⭐: DropzoneComponent -> isError`, isError);
  // console.log(`⭐: DropzoneComponent -> isLoading`, isLoading);
  console.log(`⭐: DropzoneComponent -> imgDataArr`, imgDataArr);

  function handleFileUpload() {
    setFileData(Object.keys(imageFiles).map((key) => imageFiles[key]));
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
  };
  return <FormContext.Provider value={ctx}>{children}</FormContext.Provider>;
};

export default FormContextProvider;
