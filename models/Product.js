const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name."],
      trim: true,
      lowercase: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name is too short"],
      maxLength: [30, "Name is too big"],
    },
    description: {
      type: String,
      required: true,
    },

    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "ltr", "pcs", "bag"],
        message: "unit value can't be {VALUE}, must be kg/ltr/pcs/bag",
      },
    },
    imageURLs: [
      {
        type: String,
        required: true,
        validate: {
          validator: (value) => {
            if (!Array.isArray(value)) {
              return false;
            }
            let isValid = true;
            value.forEach((url) => {
              if (!validator.isURL(url)) {
                isValid = false;
              }
            });
            return isValid;
          },
          message: "Please provide a valid image urls",
        },
      },
    ],
    category: {
      type: String,
      requred: true,
    },
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
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
// schema -> model -> query
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
