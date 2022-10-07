const Product = require("../models/Product");

exports.getProductService = async (filters,queries) => {
  const products = await Product.find(filters)
  .sort(queries.sortBy)
  .select(queries.fields);
  return products;
};
exports.createProductService = async (data) => {
  const product = await Product.create(data);
  return product;
};

exports.updateProductService = async (productId, data) => {
  const result = await Product.updateOne(
    { _id: productId },
    { $inc: data },
    { runValidators: true }
  );
  return result;
};

exports.bulkUpdateProductService = async (data) => {
  // const result = await Product.updateMany({ _id: data.ids }, data.data, {
  //   runValidators: true,
  // });
  // return result;
  const products = [];
  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });
  const result = await Promise.all(products);
  return result;
};
exports.bulkDeleteProductService   = async (ids) => {
  const result = await Product.deleteMany({ });
  return result;
};

exports.deleteProductByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};
