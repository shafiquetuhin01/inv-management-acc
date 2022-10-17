const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const multer = require('multer');

const uploader = multer({dest: "images/"})

router.post("/file-upload", uploader.single("images"), productController.fileUpload)

{/* <input type="file" name="image" />  */}
// const formData = new formData();
// formData.append("image",  formData) 

router.route("/bulk-update").patch(productController.bulkUpdateProductService);
router.route("/bulk-delete").delete(productController.bulkDeleteProductService);

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);

router
  .route("/:id")
  .patch(productController.updateProduct)
  .delete(productController.deleteProductById);

module.exports = router;
