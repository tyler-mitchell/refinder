import { storageRef } from "firebase/core";
async function handleUpload(productDocId, imageFiles) {
  const filesArr = Object.keys(imageFiles).map((key) => imageFiles[key]);

  let fileInfo = {
    root: "product-images",
    // fileName: "image1",
    folder: productDocId,
  };

  const { root, fileName, folder } = fileInfo;
  try {
    const fbImgData = Promise.all(
      filesArr.map(async ({ file, primary }) => {
        const ref = storageRef.child(`${root}/${folder}/${file.name}`);
        const uploadTask = await ref.put(file);
        const downloadUrl = await uploadTask.ref.getDownloadURL();
        return downloadUrl;
      })
    );

    fbImgData.then((data) => {
      console.log("META DATA: ", data);
      // dispatch(addProductImage({ data }));
    });
  } catch (error) {}
}
