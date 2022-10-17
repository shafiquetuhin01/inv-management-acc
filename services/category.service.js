const Category = require("../models/Category");

exports.getCategoryService = async () => {
  const categoies = await Category.find({});
  return categoies;
};
exports.createCategoryService = async (data) => {
  const category = await Category.create(data);
  return category;
};

