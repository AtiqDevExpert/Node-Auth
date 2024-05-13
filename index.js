require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
app.use("/uploads", express.static("uploads"));

const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const invoiceRouter = require("./routes/invoice");
const categoryRouter = require("./routes/category");
const { connectMongoDB } = require("./connection");
// const username = "atiqurrehman01m";
// const password = "tlNn3dkbCzc7jcKn";
// const clusterName = "cluster0";
// const dbName = "react-native-mern";

// const uri = `mongodb+srv://${username}:${password}@${clusterName}.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 8000;
const dbUrl = process.env.MONGODB_URL;
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
app.get("/", (req, res) => res.send("Backend Started!"));
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/invoices", invoiceRouter);
app.use("/api/categories", categoryRouter);

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
