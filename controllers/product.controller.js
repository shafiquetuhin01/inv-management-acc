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
exports.bulkDeleteProductService = async (req, res, next) => {
  try {
    const result = await bulkDeleteProductService(req.body.ids);
    res.status(200).json({
      status: "success",
      message: "successfully deleted all the products",
      data: result
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
    const {id} = req.params;
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
      data: result
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "This product can't be deleted.",
      error: error.message,
    });
  }
};
