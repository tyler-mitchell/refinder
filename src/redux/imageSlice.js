import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "images",
  initialState: {
    stage: 0,

    images: []
  },
  reducers: {
    setStage: (state, action) => {
      const { id } = action.payload;
      state.stage = id;
    },
    clearDropzone: state => {
      for (const it of state.images) {
        // free memory.
        window.URL.revokeObjectURL(it.preview);
      }
      state.images = [];
    },
    startAgain: state => {
      for (const it of state.images) {
        // free memory.
        window.URL.revokeObjectURL(it.preview);
      }
      state.images = [];
    },

    storeImages: (state, action) => {
      // state.images.slice();
      const { newFiles, maxLength } = action.payload;
      // console.log(`⭐: acceptedFiles`, acceptedFiles);
      // let requiredLength = maxLength - state.images.length;
      // const newFiles = [];
      // for (const it of acceptedFiles) {
      //   if (!requiredLength) break;
      //   const sameName = state.images.find(el => el.name === it.name);
      //   if (typeof sameName === "undefined" && requiredLength) {
      //     newFiles.push(it);
      //     requiredLength--;
      //   }
      // }
      // // generate previews of these new files
      // newFiles.forEach(file => {
      //   file.preview = window.URL.createObjectURL(file);
      // });
      state.images = newFiles;
      // console.log(`⭐: state`, newFiles);
    },
    changeCompressionMode: (state, action) => {
      const { mode } = action.payload;
    },

    // private functions
    updateProgress: (state, action) => {
      const { id, value } = action.payload;
    },
    updateFileStatus: (state, action) => {
      const { id, status } = action.payload;
    },
    updateCompressedImage: (state, action) => {
      const { id, res, status } = action.payload;
    },
    updateFinalResult: (state, action) => {
      const { bytes, compressedBytes } = action.payload;
    },
    readyZip: (state, action) => {
      const { bytes, compressedBytes } = action.payload;
    }
  }
});

export const {
  setStage,
  startAgain,
  storeImages,
  clearDropzone
} = slice.actions;
export default slice.reducer;
