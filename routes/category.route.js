const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

router
  .route("/")
  .get(categoryController.getCategory)
  .post(categoryController.createCategory);


module.exports = router;
