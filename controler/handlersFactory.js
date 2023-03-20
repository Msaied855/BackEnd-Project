const asyncHandler = require("express-async-handler"); // wrap the async await with this insted of using try catch
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const documents = await Model.findByIdAndDelete(id);
    if (!documents) {
      return next(new ApiError(`No documents for this id ${id}`, 404));
    }
    res.status(204).send();
  });
  exports.updateOne=(Model)=> asyncHandler(async (req, res, next) => {
    const documents = await Model.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!documents) {
      return next(new ApiError(`No documents for this id ${req.params.id}`, 404));
    }
    res.status(200).json({ data: documents });
  });
