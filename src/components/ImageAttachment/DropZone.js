import React, { Fragment } from "react";
import styles, { StyledContainer, useStyles } from "./DropZone.styles";
import ImageDropzone from "./DropZoneItem";
import useImgStyles from "components/ProductImages/ProductImages.styles";
import { useDropzone } from "react-dropzone";
import PrimaryUnfilledIcon from "@material-ui/icons/StarBorderRounded";
import PrimaryFilledIcon from "@material-ui/icons/StarRounded";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import ImageIcon from "@material-ui/icons/AddAPhotoOutlined";
import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Button,
  Divider,
  Typography,
  Paper,
} from "@material-ui/core";
// import prettyBytes from "pretty-bytes";
import { useSelector, useDispatch } from "react-redux";
import { storeImages, deleteImage, setPrimaryImage } from "redux/imageSlice";
import { setProductDocId, addProductImage } from "redux/createProductSlice";
import useLocalStorageState from "hooks/useLocalStorage";
import useFirebaseUpload from "firebase/firebaseStorage";
import { FormContext } from "views/CreateProductView/FormContext";
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

// 10 MB

const MAX_FILE_SIZE = 10;
const MAX_IMAGES = 6;
function DropzoneComponent({ compression, ...props }) {
  const classes = useStyles();
  const imgClasses = useImgStyles();
  const [previewImage, setPreviewImage] = React.useState(0);
  const { imageFiles, setImageFiles } = React.useContext(FormContext);
  const [newFiles, setNewFiles] = React.useState([]);

  const { imagesArr: imagesData, primaryImage } = useSelector((s) => s.images);
  const productDocId = useSelector((s) => s.createProduct.productDocId);

  React.useEffect(() => {
    if (!productDocId) {
      dispatch(setProductDocId());
    }
  }, []);
  React.useEffect(() => {
    if (newFiles) {
      const res = imagesData.reduce((acc, cur, index, arr) => {
        const foundImg = newFiles.find((v) => v.name === cur.name);

        if (foundImg) {
          acc[cur?.name] = {
            file: foundImg,
            name: `image${index}`,
            primary: cur?.name === primaryImage ? true : false,
          };
        }
        if (cur?.name in imageFiles) {
          acc[cur.name] = imageFiles[cur.name];
        }
        return acc;
      }, {});
      console.log(`⭐: DropzoneComponent -> imageFiles`, imageFiles);
      setImageFiles(res);
    }
  }, [imagesData]);
  const dispatch = useDispatch();

  const onDrop = React.useCallback(
    (acceptedFiles) => {
      const imgMetaData = [];
      for (const f of acceptedFiles) {
        console.log(`⭐: DropzoneComponent -> acceptedFiles`, acceptedFiles);
        const url = window.URL.createObjectURL(f);
        imgMetaData.push({ name: f.name, blob: url });
      }
      setNewFiles(acceptedFiles);
      dispatch(storeImages({ imgMetaData }));
      // setImages([...acceptedFiles, ...imageFiles]);
    },
    [imageFiles]
  );

  const [
    { imgDataArr, data, isLoading, isError, progress },
    setFileData,
  ] = useFirebaseUpload({
    root: "product-images",
    fileName: "image1",
    folder: productDocId,
  });
  // console.log(`⭐: DropzoneComponent -> progress`, progress);
  // console.log(`⭐: DropzoneComponent -> isError`, isError);
  // console.log(`⭐: DropzoneComponent -> isLoading`, isLoading);
  // console.log(`⭐: DropzoneComponent -> imgDataArr`, imgDataArr);

  function handleUpload() {
    setFileData(Object.keys(imageFiles).map((key) => imageFiles[key]));
  }

  function handleDelete(i, name) {
    window.URL.revokeObjectURL(imagesData[i]);
    dispatch(deleteImage({ index: i, name: name }));
  }
  function handleSetPrimary(imgName) {
    dispatch(setPrimaryImage({ name: imgName }));
  }

  return (
    <div>
      {/* <StyledContainer maxFileSize={MAX_FILE_SIZE}> */}
      <div
        className={imgClasses.root}
        style={{
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* <Grid item container xs={6}> */}
        <Paper
          className={imgClasses.img}
          variant="outlined"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          {imagesData[previewImage]?.blob ? (
            <img
              className={imgClasses.img}
              src={imagesData[previewImage].blob}
              alt={"hello"}
            />
          ) : (
            <>
              <Typography
                color="textSecondary"
                variant="h6"
                display="block"
                align="center"
              >
                <span style={{ color: "#44b6ff" }}> Add Photos</span>
                <Typography
                  display="block"
                  color="textSecondary"
                  align="center"
                >
                  upload or drag and drop below
                </Typography>
              </Typography>
            </>

            // <ImageIcon />
          )}
        </Paper>

        <Grid
          container
          justify="center"
          spacing={1}
          xs={12}
          style={{ width: "80%" }}
        >
          {imagesData.map((image, i) => {
            return (
              <Grid item key={i}>
                <ImageDropzone
                  classes={imgClasses}
                  onDrop={onDrop}
                  key={i}
                  imageIndex={i}
                  image={image || null}
                  onDelete={handleDelete}
                  onSetPrimary={handleSetPrimary}
                  setPreviewImage={setPreviewImage}
                  previewImageIndex={previewImage}
                  totalImages={imagesData.length}
                  isPrimary={image.name === primaryImage}
                />
                {/* {image && (
                    <GridListTileBar
                      style={{ borderRadius: "5px" }}
                      // title={tile.title}
                      // titlePosition="top"
                      title={
                        image.name === primaryImage ? (
                          <IconButton
                            aria-label={`primary`}
                            className={classes.iconFilled}
                          >
                            <PrimaryFilledIcon fontSize="large" />
                          </IconButton>
                        ) : (
                          <IconButton
                            aria-label={`primary`}
                            className={classes.icon}
                            onClick={() => {
                              dispatch(setPrimaryImage({ name: image.name }));
                            }}
                          >
                            <PrimaryUnfilledIcon fontSize="large" />
                          </IconButton>
                        )
                      }
                      actionIcon={
                        <IconButton
                          aria-label={`delete`}
                          className={classes.icon}
                          onClick={() => {}}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                      actionPosition="right"
                      className={classes.titleBar}
                    />
                  )} */}
              </Grid>
            );
          })}
        </Grid>
        {/* </Grid> */}
        <Grid item xs={8}></Grid>
      </div>

      {/* </StyledContainer> */}

      {/* <div className="box-foot mb-5 d-flex flex-row flex-wrap justify-content-between">
        <div className="modes">
          <button
            className={`lossless btn ${
              compression === "lossless" ? "active" : ""
            }`}
          >
            Lossless
          </button>
          <button
            className={`lossy btn ${compression === "lossy" ? "active" : ""}`}
          >
            Lossy
          </button>
        </div>
        <button
          className="compress-btn btn"
          disabled={imagesData.length <= 0}
          onClick={() => {
            handleUpload();
          }}
        >
          Upload
        </button>
      </div>
      <style jsx>{styles}</style> */}

      {/* <Button
        // className="compress-btn btn"
        disabled={imagesData.length <= 0}
        onClick={() => {
          handleUpload();
        }}
      >
        Upload
      </Button> */}
    </div>
  );
}

DropzoneComponent.defaultProps = {
  images: [],
};
export default DropzoneComponent;
