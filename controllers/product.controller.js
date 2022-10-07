const { json } = require("express");
const {
  getProductService,
  createProductService,
  updateProductService,
  bulkUpdateProductService,
  deleteProductByIdService,
  bulkDeleteProductService,
} = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
  try {
    let filters = { ...req.query };
    const excludeField = ["sort", "page", "limit"];
    excludeField.forEach((field) => delete filters[field]);

    //gt, lt, gte, lte
    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filterString);
    const queries = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }

    if (req.query.page) {
      const {page=1, limit=10} = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const products = await getProductService(filters, queries);
    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Can't get the data",
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await createProductService(req.body);
    result.logger;
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
};
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductService(id, req.body);
    res.status(200).json({
      status: "success",
      message: "successfully updated the product",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Product updated isn't completed.",
      error: error.message,
    });
  }
};
exports.bulkUpdateProductService = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductService(req.body);
    res.status(200).json({
      status: "success",
      message: "successfully updated all the product",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "All Products updated isn't completed.",
      error: error.message,
    });
  }
};
exports.bulkDeleteProductService = async (req, res, next) => {
  try {
    const result = await bulkDeleteProductService(req.body.ids);
    res.status(200).json({
      status: "success",
      message: "successfully deleted all the products",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "All Products deleted isn't completed.",
      error: error.message,
    });
  }
};
exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteProductByIdService(id);
    // if(!result.deletedCount){
    //   return res.status(400).json({
    //     status:"failed",
    //     error:"Couldn't delete the product"
    //   })
    // }
    res.status(200).json({
      status: "success",
      message: "successfully deleted the the product",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "This product can't be deleted.",
      error: error.message,
    });
  }
};
