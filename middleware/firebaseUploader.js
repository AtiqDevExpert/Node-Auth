const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const { firebaseConfig } = require("../config/firebase");
const { currentDateTime } = require("../service/currentDataTime");

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const firebaseUploader = async (file, folderName) => {
  try {
    const dateTime = currentDateTime();
    const storageRef = ref(
      storage,
      `${folderName}/${dateTime + "_" + file.originalname}`
    );

    // Create file metadata including the content type
    const metadata = {
      contentType: file.mimetype,
    };

    // Upload the file to the Cloud Storage
    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata
    );
    const downloadURL = await getDownloadURL(snapshot.ref);

    const imageData = {
      message: "File uploaded to Firebase Storage",
      downloadURL: downloadURL,
      success: true,
    };

    return imageData;
  } catch (error) {
    return error;
  }
};

module.exports = { firebaseUploader };
