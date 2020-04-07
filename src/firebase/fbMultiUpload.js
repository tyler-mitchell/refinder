import { storageRef } from "firebase/core";
async function fbMultiImageUpload(productDocId, imageFilesObj) {
  const filesArr = Object.keys(imageFilesObj).map((key) => imageFilesObj[key]);

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
        // const { fullPath, contentType } = uploadTask.snapshot.metadata;

        return {
          downloadUrl,
          isPrimary: primary,
        };
      })
    );

    // fbImgData.then((data) => {
    //   console.log("META DATA: ", data);

    //   // dispatch(addProductImage({ data }));
    // });
    return fbImgData;
  } catch (error) {}
}
export default fbMultiImageUpload;
