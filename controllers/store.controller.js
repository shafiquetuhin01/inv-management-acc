
const { createStoreService, getStoreService, getStoreByIdService, updateStoreService } = require("../services/store.service");

exports.createStore = async (req, res, next) => {
  try {
    const result = await createStoreService(req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully created the store",
    });
   
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't create the store",
    });
  }
};
exports.getStore = async (req, res, next) => {
  try {
    const store = await getStoreService(req.body);
    res.status(200).json({
      status: "success",
     data: store
    });
   
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't get the store",
    });
  }
};
exports.getStoreById = async (req, res, next) => {
    const {id} = req.params;
  try {
    const store = await getStoreByIdService(id);
    if(!store){
        return res.status(400).json({
            status:"fail",
            error:"Couldn't find the store"
        })
    }
    res.status(200).json({
      status: "success",
     data: store
    });
   
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't get the store",
    });
  }
};
exports.updateCategory = async (req, res, next) => {
    const {id} = req.params;
  try {
    const result = await updateStoreService(id, req.body);
    console.log(result);
    if(!result.modifiedCount){
        return res.status(400).json({
            status:"fail",
            error:"Successfully updated the store"
        })
    }
    res.status(200).json({
      status: "success",
     message:"Successfully updated"
    });
   
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't update the store",
    });
  }
};
