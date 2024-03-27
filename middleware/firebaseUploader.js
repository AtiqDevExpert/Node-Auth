const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const { firebaseConfig } = require("../config/firebase");

const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};

const firebaseUploader = async (file) => {
  try {
    const dateTime = giveCurrentDateTime();
    const storageRef = ref(
      storage,
      `User/${file.originalname + "_" + dateTime}`
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

    // Get the download URL of the uploaded file
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
