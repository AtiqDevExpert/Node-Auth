// var admin = require("firebase-admin");
// const uuid = require("uuid-v4");
// const serviceAccount = {
//   type: "service_account",
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//   private_key: process.env.FIREBASE_PRIVATE_KEY,
//   client_email: process.env.FIREBASE_CLIENT_EMAIL,
//   client_id: process.env.FIREBASE_CLIENT_ID,
//   auth_uri: process.env.FIREBASE_AUTH_URI,
//   token_uri: process.env.FIREBASE_TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
//   client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
// };

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: process.env.DATABASE_URL,
//   storageBucket: process.env.STORAGE_BUCKET,
// });
// const bucket = admin.storage().bucket();

// const imageUpload = async (file, folderName) => {
//   return new Promise((resolve, reject) => {
//     const metadata = {
//       metadata: {
//         firebaseStorageDownloadTokens: uuid(),
//       },
//       contentType: file.mimetype,
//       cacheControl: "public , max-age=31536000",
//     };
//     const fileName = `${folderName}/${uuid()}_${file.originalname}`;
//     const blob = bucket.file(fileName);
//     const blobStream = blob.createWriteStream({
//       metadata: metadata,
//       gzip: true,
//     });
//     blobStream.on("error", (error) => {
//       reject(error);
//     });
//     blobStream.on("finish", () => {
//       const imageURL = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
//       resolve(imageURL);
//     });
//     blobStream.end(file.buffer);
//   });
// };

// module.exports = { imageUpload };
