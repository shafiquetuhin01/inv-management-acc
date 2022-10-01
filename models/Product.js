const mongoose = require('mongoose');
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
  
  // mongoose miidlewares for saving data: pre/post
  productSchema.pre("save", function (next) {
    // this
    if (this.quantity == 0) {
      this.status = "out-of-stock";
    }
    console.log("Before data saving");
    next();
  });
  // productSchema.post("save", function (doc, next) {
  //   console.log("After data saving");
  //   next();
  // });
  
  productSchema.methods.logger = function () {
    console.log(`data saved for ${this.name}`);
  };
  
  // schema -> model -> query
  const Product = mongoose.model("Product", productSchema);

  module.exports = Product;