import { storage, storageRef, taskEvent } from "./core";
import { useState, useEffect } from "react";
import { addProductImage } from "redux/createProductSlice";
import { useDispatch } from "react-redux";
/**
 * Utility function to upload a file in a Firebase storage bucket
 *
 * @param {File} rawFile the file to upload
 * @param {File} storageRef the storage reference
 * @returns {Promise}  the promise of the URL where the file can be download from the bucket
 */

export async function uploadFileToBucket(rawFile, storageRef) {
  console.log("Beginning upload");
  return storageRef
    .put(rawFile)
    .then((snapshot) => {
      console.log("Uploaded file !");
      // Add url
      return storageRef.getDownloadURL();
    })
    .catch((error) => {
      console.log(error);
      throw new Error({ message: error.message_, status: 401 });
    });
}

/**
 * Utility function to create or update a file in Firestore
 *
 * @param {String} resource resource name, will be used as a directory to prevent an awful mess in the bucket
 * @param {File} rawFile the file to upload if it is not already there
 * @param {Function} uploadFile the storage reference
 * @returns {Promise}  the promise of the URL where the file can be download from the bucket
 */

export async function createOrUpdateFile(resource, rawFile, uploadFile) {
  console.log(
    "Beginning upload file to storage bucket for file :",
    rawFile.name
  );
  var storageRef = storage.child(resource + "/" + rawFile.name);
  // Check if the file already exist (same name, same size)
  // In this case, no need to upload
  return storageRef
    .getMetadata()
    .then((metadata) => {
      console.log(metadata);
      if (metadata && metadata.size === rawFile.size) {
        console.log("file already exists");
        return storageRef.getDownloadURL();
      } else {
        return uploadFile(rawFile, storageRef);
      }
    })
    .catch(() => {
      console.log("File does not exist");
      return uploadFile(rawFile, storageRef);
    });
}

// the firebase reference to storage
// const storageRef = storage().ref();

function FirebaseFileUploadApi(fileInfo) {
  const dispatch = useDispatch();
  const { root, fileName, folder } = fileInfo;
  console.log(`⭐: FirebaseFileUploadApi -> folder`, folder);
  // the data from the file upload response
  const [data, setData] = useState();
  // sets properties on the file to be uploaded
  const [fileData, setFileData] = useState();
  // if we are loading a file or not
  const [isLoading, setIsLoading] = useState(false);
  // if an error happened during the process
  const [isError, setIsError] = useState(false);
  // used for tracking the % of upload completed
  const [progress, setProgress] = useState(null);

  const [allDone, setAllDone] = useState(false);
  const [imgDataArr, setImgDataArr] = useState([]);
  const promises = [];
  // this function will be called when the any properties in the dependency array changes
  useEffect(() => {
    const uploadData = async () => {
      // initialize upload information
      setIsError(false);
      setIsLoading(true);
      setProgress({ value: 0 });
      if (!fileData) return;
      console.log(`⭐: uploadData -> fileData`, fileData);
      // wrap the whole thing in a try catch block to update the error state
      try {
        // let fName = `${new Date().getTime()}-${fileData.name}`;
        console.log(`⭐: uploadData -> fileData`, fileData);
        if (!Array.isArray(fileData)) return;

        // setting the firebase properties for the file upload
        fileData.forEach(({ file: fileData, primary }) => {
          const resourceName = fileName ? fileName : fileData?.name;
          let ref = storageRef.child(`${root}/${folder}/${fileData.name}`);
          let uploadTask = ref.put(fileData);
          // let uploadTaskPromise = uploadTask.then(async () => {
          //   let downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
          //   const { fullPath, contentType } = uploadTask.snapshot.metadata;
          //   return {
          //     metaData: { fullPath, contentType },
          //     downloadUrl,
          //     isPrimary: primary,
          //   };
          // });
          promises.push(uploadTask);

          console.log(`⭐: uploadData -> uploadTask`, uploadTask);
          // tracking the state of the upload to assist in updating the
          // application UI
          uploadTask.on(
            taskEvent.STATE_CHANGED,
            (_progress) => {
              var value = _progress.bytesTransferred / _progress.totalBytes;
              console.log("Upload is " + value * 100 + "% done");
              setProgress({ value });
            },
            (_error) => {
              setIsLoading(false);
              setIsError(_error);
            },
            async () => {
              setIsError(false);
              setIsLoading(false);
              // need to get the url to download the file
              let downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
              // set the data when upload has completed
              const { fullPath, contentType } = uploadTask.snapshot.metadata;
              setData({
                metaData: { fullPath, contentType },
                downloadUrl,
                isPrimary: primary,
              });

              // reset progress
              setProgress(null);
            }
          );
        });
      } catch (_error) {
        setIsLoading(false);
        setIsError(_error);
      }
    };
    Promise.all(promises).then((tasks) => {
      console.log("all uploads complete");
    });
    fileData && uploadData();
  }, [fileData]);

  useEffect(() => {
    if (data) {
      setImgDataArr([...imgDataArr, data]);
      console.log(`⭐: imgDataArr`, imgDataArr);
      console.log(`⭐: fileData`, fileData);
      dispatch(addProductImage({ data }));
      if (imgDataArr?.length === fileData.length) {
        setAllDone(true);
        console.log(`⭐: ALLLLLLLLLL DONE`, true);
      }
    }
  }, [data]);

  return [
    { imgDataArr, data, isLoading, isError, progress, allDone },
    setFileData,
  ];
}
export default FirebaseFileUploadApi;
