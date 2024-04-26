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
const PORT = process.env.PORT || 8000;
const dbUrl = process.env.MONGO_DB_URL;
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
app.use("/api/category", categoryRouter);

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
