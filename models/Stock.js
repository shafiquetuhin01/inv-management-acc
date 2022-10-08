const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const stockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },
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
    price: {
      type: Number,
      required: true,
      min: [0, "Product price can't be negative"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Product quantity can't be negative"],
    },
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
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}",
      },
    },
    store: {
      name: {
        type: String,
        trim: true,
        required: [true, "Please provide a store name"],
        lowercase: true,
        enum: {
          values: [
            "dhaka",
            "chattogram",
            "sylhet",
            "rajshahi",
            "rangpur",
            "khulna",
            "barishal",
            "mymensingha",
          ],
          message: "{VALUE} is not a valid name",
        },
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "Store",
      },
    },
    suppliedBy: {
      name: {
        String,
        trim: true,
        required: [true, "Please provide a valid supplier name"],
      },
      id: {
        type: ObjectId,
        ref: "Supplier",
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
const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
