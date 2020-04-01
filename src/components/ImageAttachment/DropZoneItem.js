import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import ClearIcon from "@material-ui/icons/Cancel";
import FileCopy from "@material-ui/icons/AddAPhotoOutlined";
import Paper from "@material-ui/core/Paper";

export const StyledZoneItem = styled.div`
  text-align: center;
  background-color: #efebeb;
  height: 100%;
  width: 100%;
  margin: 10px;
  border-radius: 5px;
`;
const ACTIVE_COLOR = "#6695ff";
// Styles
const ImagesDropZoneContainer = styled(Paper)`
  border-color: ${props =>
    (props.isactive && `${ACTIVE_COLOR} !important`) || "none"};
  width: 100%;
  height: 100%;

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
  /* width: 98.5%;
  height: 98.5%; */
`;
const ActiveText = styled.p`
  color: ACTIVE_COLOR;
`;

const MAX_FILE_SIZE = 10;

const DropZoneItem = props => {
  const { imageIndex, image, onDelete, onDrop, totalImages } = props;

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: MAX_FILE_SIZE * 1024 * 1024,
    multiple: true
  });
  const isactive = totalImages === imageIndex;

  return (
    <>
      {!image ? (
        <ImagesDropZoneContainer
          variant="outlined"
          isactive={isactive}
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
                  onDelete(imageIndex);
                }}
              />
            </>
          )}
        </ImagesDropZoneContainer>
      ) : (
        <ImageItem src={image.blob} alt={image.name} />
      )}
    </>
  );
};

export default DropZoneItem;
