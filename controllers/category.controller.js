
const { createCategoryService, getCategoryService, getCategoryByIdService, updateCategoryService } = require("../services/brand.service");

exports.createCategory = async (req, res, next) => {
  try {
    const result = await createCategoryService(req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully created the category",
    });
    return result
   
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't create the category",
    });
  }
};
exports.getCategory = async (req, res, next) => {
  try {
    const category = await getCategoryService(req.body);
    res.status(200).json({
      status: "success",
     data: category
    });
   
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't get the category",
    });
  }
};
exports.getCategoryById = async (req, res, next) => {
    const {id} = req.params;
  try {
    const category = await getCategoryByIdService(id);
    if(!category){
        return res.status(400).json({
            status:"fail",
            error:"Couldn't find the category"
        })
    }
    res.status(200).json({
      status: "success",
     data: category
    });
   
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't get the category",
    });
  }
};
exports.updateCategory = async (req, res, next) => {
    const {id} = req.params;
  try {
    const result = await updateCategoryService(id, req.body);
    console.log(result);
    if(!result.modifiedCount){
        return res.status(400).json({
            status:"fail",
            error:"Successfully updated the category"
        })
    }
    res.status(200).json({
      status: "success",
     message:"Successfully updated"
    });
   
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't update the category",
    });
  }
};
