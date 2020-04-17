import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import { database, fieldValue } from "firebase/core";
import fbMultiImageUpload from "firebase/fbMultiUpload";
function deleteOldData() {
  database
    .collection("materials")
    .get()
    .then(function (querySnapshot) {
      // Once we get the results, begin a batch
      let batch = database.batch();

      querySnapshot.forEach(function (doc) {
        // For each doc, add a delete operation to the batch
        // if ((doc.data()?.description?.length ?? 0) < 30) {
        console.log(`⭐: deleteOldData -> DELETING`, doc.data());
        batch.delete(doc.ref);
        // }
      });

      // Commit the batch
      return batch.commit();
    })
    .then(function () {
      // Delete completed!
      // ...
    });
}

function getDummyData({
  productId,
  displayName,
  avatar,
  uid,
  title,
  description,
  address,
  email,
  num = 0,
}) {
  const product = {
    uid: uid,
    displayName: displayName,
    avatar:
      "https://lh3.googleusercontent.com/a-/AOh14GhMF0YBXe-veOFYBQikNlvNrl-ovHmOOIwRqCn7",
    free: false,
    productImages: [
      {
        downloadUrl:
          "https://firebasestorage.googleapis.com/v0/b/refinder-exchange.appspot.com/o/product-images%2FO4J4qY6c9Lr4A9uzp0Mo%2FSeasoned%20Fire%20Wood%20Mesquite%20-Oak%20FireWood%204%20Fireplace%20-%20materials%20-...1.jpg?alt=media&token=c046ca3c-2ebd-42cd-9cbd-00a05360d84f",
        isPrimary: true,
      },
      {
        downloadUrl:
          "https://firebasestorage.googleapis.com/v0/b/refinder-exchange.appspot.com/o/product-images%2FO4J4qY6c9Lr4A9uzp0Mo%2FSeasoned%20Fire%20Wood%20Mesquite%20-Oak%20FireWood%204%20Fireplace%20-%20materials%20-...2.jpg?alt=media&token=b4ead7e2-0c46-4104-b6f8-11d2a1bdd89c",
        isPrimary: false,
      },
      {
        downloadUrl:
          "https://firebasestorage.googleapis.com/v0/b/refinder-exchange.appspot.com/o/product-images%2FO4J4qY6c9Lr4A9uzp0Mo%2FSeasoned%20Fire%20Wood%20Mesquite%20-Oak%20FireWood%204%20Fireplace%20-%20materials%20-...3.jpg?alt=media&token=3d9ef503-5c65-4a48-a02f-0d27bdd47e3d",
        isPrimary: false,
      },
      {
        downloadUrl:
          "https://firebasestorage.googleapis.com/v0/b/refinder-exchange.appspot.com/o/product-images%2FO4J4qY6c9Lr4A9uzp0Mo%2FSeasoned%20Fire%20Wood%20Mesquite%20-Oak%20FireWood%204%20Fireplace%20-%20materials%20-...4.jpg?alt=media&token=b0b26a18-6aa4-49ad-aeb2-127adb38a8c4",
        isPrimary: false,
      },
      {
        downloadUrl:
          "https://firebasestorage.googleapis.com/v0/b/refinder-exchange.appspot.com/o/product-images%2FO4J4qY6c9Lr4A9uzp0Mo%2FSeasoned%20Fire%20Wood%20Mesquite%20-Oak%20FireWood%204%20Fireplace%20-%20materials%20-...5.jpg?alt=media&token=37a035af-d647-47db-aaf9-d5073572dfc3",
        isPrimary: false,
      },
      {
        downloadUrl:
          "https://firebasestorage.googleapis.com/v0/b/refinder-exchange.appspot.com/o/product-images%2FO4J4qY6c9Lr4A9uzp0Mo%2FSeasoned%20Fire%20Wood%20Mesquite%20-Oak%20FireWood%204%20Fireplace%20-%20materials%20-...6.jpg?alt=media&token=0f16a270-32a1-4740-81be-ac78419ec76c",
        isPrimary: false,
      },
    ],
    title: title || "automated_test_post_" + (num + 1),
    description: description || "automated_description",
    type: ["wood"],
    address: address || {
      longitude: -98.294744,
      latitude: 29.55809,
      address: "undefined The 1212",
      city: "Universal City",
      state: "Texas",
      zipcode: "78148",
      country: "United States of America",
      complete:
        "The 1212, Universal City, Texas 78148, United States of America",
    },
    created: fieldValue.serverTimestamp(),
  };
  const discussion = {
    ownerId: uid,
    productId: productId,
    ownerName: displayName,
    ownerAvatar: avatar,
    ownerEmail: email,
  };

  return { product, discussion };
}
export const addToFirebase = createAsyncThunk(
  "createProduct/addToFirebase",
  async (productImages, { getState, requestId }) => {
    // const { currentRequestId, loading } = getState().users;

    const { uid, displayName, avatar, email } = getState().auth.userData;
    const { data: formData, productDocId } = getState().createProduct;

    const product = {
      uid,
      displayName,
      avatar,
      free: false,
      productImages,
      ...formData,
      created: fieldValue.serverTimestamp(),
    };

    const discussion = {
      ownerId: uid,
      productId: productDocId,
      ownerName: displayName,
      ownerAvatar: avatar,
      ownerEmail: email,
    };

    // const { product, discussion } = getDummyData({
    //   productId: productDocId,
    //   uid,
    //   displayName,
    //   avatar,
    //   email,
    //   num: 2,
    // });
    console.log(`⭐: product`, product);
    console.log(`⭐: discussion`, discussion);

    try {
      const res = await database
        .collection("materials")
        .doc(productDocId)
        .set(product);

      await database
        .collection("materials")
        .doc(productDocId)
        .collection("product_discussion")
        .doc("discussion_info")
        .set(discussion);
    } catch (error) {
      console.log(`⭐: ERROR WHILE CREATING PRODUCT`, error);
    }

    return uid;
  }
);

const initialState = {
  data: {},
  res: null,
  uploading: false,
  error: false,
  productDocId: null,
  finished: false,
  productImages: [],
};

export const createProductSlice = createSlice({
  name: "createProduct",
  initialState: initialState,
  reducers: {
    addToForm: (state, action) => {
      const { formData } = action.payload;
      console.log(`⭐: formData`, formData);
      state.data = { ...state.data, ...formData };
    },
    addProductImage: (state, action) => {
      const { data } = action.payload;
      state.productImages = data;
    },
    setProductDocId: (state) => {
      state.productDocId = database.collection("materials").doc().id;
    },
    resetCreateProductState: (state) => {
      return initialState;
    },
  },
  extraReducers: {
    [addToFirebase.fulfilled]: (state, action) => {
      state.uploading = false;
      state.error = false;
      state.finished = true;
    },
    [addToFirebase.pending]: (state, action) => {
      state.uploading = true;
    },
    [addToFirebase.rejected]: (state, action) => {
      state.error = true;
    },
  },
});

export const selectFormData = (state) => state.counter.value;
export const {
  increment,
  decrement,
  addToForm,
  setProductDocId,
  addProductImage,
  resetCreateProductState,
} = createProductSlice.actions;

export default createProductSlice.reducer;
