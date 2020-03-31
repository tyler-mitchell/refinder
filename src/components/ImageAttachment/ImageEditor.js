import React, { useState, useCallback, useEffect } from "react";
import {
  makeStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button
} from "@material-ui/core";
import Cropper from "react-easy-crop";

const useStyles = makeStyles(theme => ({
  cropRoot: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  dialogContet: {
    position: "relative",
    minHeight: 450
  }
}));

function ImageEditor({ original, onSave, onClose }) {
  const classes = useStyles();
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [cropArea, setCropArea] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0
  });

  const originalSize = () => ({
    width: croppedAreaPixels.width / (cropArea.width / 100),
    height: croppedAreaPixels.height / (cropArea.height / 100)
  });

  const handleSave = () => {
    const image = new Image();
    image.src = original;
    const canvas = document.createElement("canvas");
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingQuality = "high";

    console.log(
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    // set to draw behind current content
    ctx.globalCompositeOperation = "destination-over";
    // set background color
    ctx.fillStyle = "#FFFFFF";
    // draw background / rect on entire canvas
    ctx.fillRect(0, 0, croppedAreaPixels.width, croppedAreaPixels.height);

    canvas.toBlob(blob => {
      if (!blob) {
        console.error("Canvas is empty");
        return;
      }
      blob.name = "cropped.jpg";
      onSave(URL.createObjectURL(blob));
    }, "image/jpeg");
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCropArea(croppedArea);
    setCroppedAreaPixels(croppedAreaPixels);
  };

  return (
    <Dialog open={!!original} fullWidth>
      <DialogTitle>Rajaa kuva</DialogTitle>
      <DialogContent className={classes.dialogContet}>
        <div className={classes.cropRoot}>
          <Cropper
            image={original}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImageEditor;
