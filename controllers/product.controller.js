const {
  getProductService,
  createProductService,
  updateProductService,
  bulkUpdateProductService,
} = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await getProductService();
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
      data: result
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "All Products updated isn't completed.",
      error: error.message,
    });
  }
};
