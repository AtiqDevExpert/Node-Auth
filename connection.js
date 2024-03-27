const mongoose = require("mongoose");
async function connectMongoDB(url) {
  return mongoose
    .connect(url)
    .then((success) => {
      console.log("Connected with mongoDB Successful");
    })
    .catch((error) => {
      console.log("Error during Connected with mongoDB", error);
    });
}
module.exports = { connectMongoDB };
