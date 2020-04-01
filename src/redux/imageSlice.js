import { createSlice } from "@reduxjs/toolkit";
const MAX_IMAGES = 6;
export const slice = createSlice({
  name: "images",
  initialState: {
    maxReached: false,
    error: false,
    primaryImage: null,
    populated: 0,
    imagesArr: Array(MAX_IMAGES).fill(0)
  },
  reducers: {
    deleteImage: (state, action) => {
      const { index, name } = action.payload;
      state.imagesArr.splice(index, 1);
      state.imagesArr.push(0);
      if (state.primaryImage === name) {
        state.primaryImage = state.imagesArr[0]?.name || null;
      }
    },
    setPrimaryImage: (state, action) => {
      const { name } = action.payload;

      state.primaryImage = name;
    },

    storeImages: (state, action) => {
      const { imgMetaData } = action.payload;

      for (const f of imgMetaData) {
        // make sure the images can fit
        if (state.imagesArr.length >= imgMetaData?.length) {
          // find the first available position
          const position = state.imagesArr.findIndex(i => i === 0);
          // check if image already exists
          const exists = state.imagesArr.find(
            v => v.name + v.lastModified === f.name + f.lastModified
          );

          if (!exists) {
            // initialize the first image as the primary
            if (position === 0) {
              state.primaryImage = f.name;
            }
            // replace empty index with new image data
            state.imagesArr.splice(position, 1, f);

            state.populated += 1;
          } else {
            state.error = "Image already exists";
          }
        } else {
          state.maxReached = true;
          state.error = "Maximum images reached";
        }
      }
    }
  }
});

export const { storeImages, deleteImage, setPrimaryImage } = slice.actions;
export default slice.reducer;
