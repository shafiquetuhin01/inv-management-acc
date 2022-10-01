const express = require("express");
const cors = require("cors");
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

const productRoute = require('./routes/product.route');



app.get("/", (req, res) => {
  res.send("My route is working...");
});

// get/posting a database

app.use("/api/v1/product", productRoute);

module.exports = app;
