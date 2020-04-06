import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import ClearIcon from "@material-ui/icons/Cancel";
import FileCopy from "@material-ui/icons/AddAPhotoOutlined";
import PrimaryUnfilledIcon from "@material-ui/icons/StarBorderRounded";
import PrimaryFilledIcon from "@material-ui/icons/StarRounded";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import { Paper, IconButton, Tooltip } from "@material-ui/core";

const ACTIVE_COLOR = "#6695ff";
// Styles
const ImagesDropZoneContainer = styled(Paper)`
  border-color: ${(props) =>
    (props.isactive && `${ACTIVE_COLOR} !important`) || "none"};
  height: 60px;
  width: 80px;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-direction: column;
  position: relative;
`;
const CancelIcon = styled(ClearIcon)`
  cursor: pointer;
  color: red;
  position: absolute;
  top: -7px;
  right: -7px;
`;
const ImageItem = styled.img`
  object-fit: cover;
  border-radius: 5px;
  border: 2px solid transparent;
  border-color: ${(props) =>
    (props.isActive && `${ACTIVE_COLOR} !important`) || "transparent"};

  /* width: 98.5%;
  height: 98.5%; */
  &:hover {
    border-color: ${ACTIVE_COLOR};
  }
`;
const ActiveText = styled.p`
  color: ACTIVE_COLOR;
`;

const MAX_FILE_SIZE = 10;
const ActionContainer = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
`;
const DropZoneItem = (props) => {
  const {
    imageIndex,
    image,
    onDelete,
    onSetPrimary,
    onDrop,
    totalImages,
    classes,
    isPrimary,
    setPreviewImage,
    previewImageIndex,
  } = props;

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: MAX_FILE_SIZE * 1024 * 1024,
    multiple: true,
  });
  const isactive = totalImages === imageIndex;

  return (
    <>
      {!image ? (
        <ImagesDropZoneContainer
          variant="outlined"
          isactive={isactive}
          className={classes.stepperImgs}
          {...getRootProps()}
        >
          {image == null && (
            <>
              <input {...getInputProps()} />
              <FileCopy
                style={{ color: isactive && ACTIVE_COLOR }}
                color="action"
              />
            </>
          )}
          {isactive && <ActiveText>Add photo</ActiveText>}
          {image && (
            <>
              <CancelIcon
                onClick={() => {
                  onDelete(imageIndex, image.name);
                }}
              />
            </>
          )}
        </ImagesDropZoneContainer>
      ) : (
        <div style={{ position: "relative" }}>
          <ImageItem
            isActive={imageIndex === previewImageIndex}
            onClick={() => {
              setPreviewImage(imageIndex);
            }}
            className={classes.stepperImgs}
            src={image.blob}
            alt={image.name}
          />
          <ActionContainer>
            <Tooltip title="Set as primary image">
              {isPrimary ? (
                <IconButton
                  size="small"
                  aria-label={`primary`}
                  style={{ color: "#f8bb32" }}
                >
                  <PrimaryFilledIcon fontSize="small" />
                </IconButton>
              ) : (
                <IconButton
                  size="small"
                  aria-label={`primary`}
                  className={classes.icon}
                  onClick={() => {
                    onSetPrimary(image.name);
                  }}
                >
                  <PrimaryUnfilledIcon fontSize="small" />
                </IconButton>
              )}
            </Tooltip>
            <IconButton
              size="small"
              aria-label={`delete`}
              style={{ color: "#f2524b" }}
              onClick={() => {
                onDelete(imageIndex, image.name);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ActionContainer>
        </div>
      )}
    </>
  );
};

export default DropZoneItem;
