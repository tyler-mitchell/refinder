import React, { useRef, Fragment, useState } from "react";
import { makeStyles, Button, ButtonBase, Fab } from "@material-ui/core";
import Close from "@material-ui/icons/Close";

// import loadImage from "blueimp-load-image";

import ImageEditor from "./ImageEditor";

const useStyles = makeStyles(theme => ({
  imgPreviewRoot: {
    position: "relative",
    maxWidth: 250,
    maxHeight: 250
  },
  imgPreview: {
    position: "relative",
    width: "100%",
    height: "100%"
  },
  deleteFab: {
    position: "absolute",
    top: 4,
    right: 4
  }
}));

function ImageInput({ image, onChange }) {
  const classes = useStyles();
  const fileInputRef = useRef();
  const [original, setOriginal] = useState(null);

  // const onSelectFile = e => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setOriginal(
  //       loadImage(
  //         e.target.files[0],
  //         function(canvas) {
  //           setOriginal(canvas.toDataURL());
  //         },
  //         { canvas: true, orientation: true }
  //       )
  //     );
  //   }
  // };

  function handleDelete(e) {
    e.persist();
    fileInputRef.current.value = "";
    setOriginal(null);
    onChange(null);
  }

  function handleClick(e) {
    e.preventDefault();
    fileInputRef.current.click();
  }

  function handleEditClose(e) {
    e.persist();
    fileInputRef.current.value = "";
    setOriginal(null);
  }

  function saveImage(url) {
    onChange(oldUrl => {
      if (oldUrl) {
        URL.revokeObjectURL(oldUrl);
      }
      setOriginal(null);
      fileInputRef.current.value = "";
      return url;
    });
  }

  return (
    <Fragment>
      {image && (
        <div className={classes.imgPreviewRoot}>
          <img className={classes.imgPreview} alt="" src={image} />

          <Fab
            className={classes.deleteFab}
            size="small"
            onClick={handleDelete}
          >
            <Close />
          </Fab>
        </div>
      )}
      <Button onClick={handleClick}>
        {image ? "Vaihda kuva" : "Lisää kuva"}
      </Button>

      <input
        hidden
        ref={fileInputRef}
        type="file"
        accept="image/*"
        // onChange={onSelectFile}
      />
      <ImageEditor
        original={original}
        onClose={handleEditClose}
        onSave={saveImage}
      />
    </Fragment>
  );
}

export default ImageInput;
