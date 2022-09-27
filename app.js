const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name."],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name is too short"],
      maxLength: [30, "Name is too big"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "ltr", "pcs"],
        message: "qty can't be {VALUE}",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "qty can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "qty must be a number",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}",
      },
    },
    //   createdAt:{
    //     time: Date,
    //     default: Date.now
    //   },
    //   updatedAt:{
    //     time: Date,
    //     default: Date.now
    //   },
    // supplier:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Supplier"
    // },
    // categories:[{
    //     name:{
    //         type: String,
    //         required: true
    //     },
    //     _id:mongoose.Schema.Types.ObjectId
    // }]
  },
  {
    timestamps: true,
  }
);

// schema -> model -> query
const Product = mongoose.model("Product", productSchema);

app.get("/", (req, res) => {
  res.send("My route is working...");
});

// posting a database
app.post("/api/v1/product", async (req, res, next) => {
  try {
    // save or create
    console.log(req.body);
    // const product = new Product(req.body);
    const result = await Product.create(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully",
      data: result,
    });
    console.log(req.body, "data is not finding");
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Data is not inserted",
      error: error.message,
    });
  }
});

module.exports = app;
