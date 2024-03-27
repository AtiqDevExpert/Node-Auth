const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
app.use("/uploads", express.static("uploads"));
const dotenv = require("dotenv");
dotenv.config();
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const { connectMongoDB } = require("./connection");

const dbUrl =
  "mongodb+srv://atiqurrehman01m:tlNn3dkbCzc7jcKn@cluster0.qgeyfgv.mongodb.net/";

connectMongoDB(dbUrl);
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.listen(process.env.PORT || port, () => {
  console.log("listening on port " + process.env.PORT || port);
});
