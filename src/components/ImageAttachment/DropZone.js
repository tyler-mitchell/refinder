import React, { Fragment } from "react";
import styles, { DropzoneContainer } from "./DropZone.styles";
import DropZoneItem from "./DropZoneItem";
import { useDropzone } from "react-dropzone";
// import prettyBytes from "pretty-bytes";
import { useSelector, useDispatch } from "react-redux";
import {
  storeImages,
  clearDropzone,
  beginCompression,
  changeCompressionMode
} from "redux/imageSlice";
import useLocalStorageState from "hooks/useLocalStorage";
// import { connect } from 'react-redux';

/**
NOTES
    - multiple files can be selected at most 15.
    - If 10 files already dropped and user trying the drop the new files, then give error.
    - User can remove any files from the dropzone before uploading.
    - Compression Button should be disabled before any file dropped.
    - Give error if user select any file greater than 12 MB and exclude from list.
    - If user select the same file twice, exclude it.
**/

const maxFileSize = 10; // 10 MB

function DropzoneComponent({ compression, ...props }) {
  const [localKey, setLocalValue] = useLocalStorageState(
    "new_product_images",
    []
  );
  const [error, setError] = React.useState(null);
  const images = useSelector(s => s.images.images);
  const dispatch = useDispatch();
  const { getRootProps, getInputProps } = useDropzone({
    accept: ["image/jpeg", "image/png"],
    onDrop: (acceptedFiles, rejectedFiles) => {
      // As we are manually generating the preview of selected images, so we don't need to free memory of rejected files.
      const maxLength = 7;
      const maxErrorTime = 3200; // 3.2 sec.
      //  max file size handled already.
      console.log("Accepted Files", acceptedFiles);
      console.log("Rejected Files", rejectedFiles);

      // handle errors.
      // handle blank drag and drop also.
      // TODO: Handle error of rejected mime type on drag and drop.
      if (rejectedFiles.length > 0 && rejectedFiles[0].name) {
        setError(`Max file size limit is ${maxFileSize}MB`);
        setTimeout(() => {
          setError(null);
        }, maxErrorTime);
      }

      if (images.length + acceptedFiles.length > maxLength) {
        setError(`Max files dropped must not be greater than ${maxLength}`);
        setTimeout(() => {
          setError(null);
        }, maxErrorTime);
      }

      // now set the state
      console.log(`⭐: DropzoneComponent -> acceptedFiles`, acceptedFiles);
      setLocalValue(acceptedFiles);

      let requiredLength = maxLength - images.length;
      const newFiles = [];
      for (const it of acceptedFiles) {
        // if (!requiredLength) break;
        const sameName = images.find(el => el.name === it.name);
        if (typeof sameName === "undefined" && requiredLength) {
          newFiles.push(it);
          requiredLength--;
        }
      }
      // generate previews of these new files
      console.log(`⭐: DropzoneComponent -> newFiles`, newFiles);
      window.URL = window.URL || window.webkitURL;
      newFiles.map(file => {
        return window.URL.createObjectURL(file);
      });
      console.log(`⭐: DropzoneComponent -> url`, newFiles);

      // console.log(`⭐: DropzoneComponent -> file`, u);
      dispatch(storeImages({ newFiles, maxLength }));

      // console.log('Images', images);
      // console.log('New Files', newFiles);
    },
    multiple: true,
    maxSize: maxFileSize * 1024 * 1024
  });

  return (
    <div className="dropzone-wrap" {...getRootProps()}>
      <DropzoneContainer>
        {images.length > 0 ? (
          <>
            {" "}
            <div
              className="clear-dropzone"
              onClick={() => dispatch(clearDropzone())}
            >
              ✕
            </div>
            <ul className="list-unstyled d-flex flex-row flex-wrap align-items-center">
              {images.map(it => (
                <DropZoneItem />
              ))}
            </ul>
          </>
        ) : (
          <>
            <input name="image" {...getInputProps()} />
            {/* <img
              // src={require("assets/refinder-logo.svg")}
              width="250"
              alt="dropIcon"
              className="dropIcon"
            /> */}
            <p
              // className="lead meta-01 mb-0 font-weight-bold"
              style={{ letterSpacing: "1px" }}
            >
              Click to Upload
            </p>
            <p className="meta-02 mb-0" style={{ letterSpacing: "1px" }}>
              or drop your files
            </p>
          </>
        )}
        <div className={error ? "error-box show" : "error-box"}>{error}</div>
      </DropzoneContainer>

      <div className="box-foot mb-5 d-flex flex-row flex-wrap justify-content-between">
        <div className="modes">
          <button
            className={`lossless btn ${
              compression === "lossless" ? "active" : ""
            }`}
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              props.changeCompressionMode("lossless");
            }}
          >
            Lossless
          </button>
          <button
            className={`lossy btn ${compression === "lossy" ? "active" : ""}`}
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              props.changeCompressionMode("lossy");
            }}
          >
            Lossy
          </button>
        </div>
        <button
          className="compress-btn btn"
          disabled={images?.length > 0 ? false : true}
          onClick={e => {
            e.stopPropagation();
            props.beginCompression();
          }}
        >
          {images.length > 0 ? "Begin Compression" : "Select First"}
        </button>
      </div>
      <style jsx>{styles}</style>
    </div>
  );
}

DropzoneComponent.defaultProps = {
  images: []
};
export default DropzoneComponent;
