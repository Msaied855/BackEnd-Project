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
exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const documents = await Model.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!documents) {
      return next(
        new ApiError(`No documents for this id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ data: documents });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    // async await
    const documents = await Model.create(req.body);
    res.status(201).json({ data: documents });
  });
exports.getOne=(Model)=>asyncHandler(async (req, res, next) => {
  
  const { id } = req.params;
  const documents = await Model.findById(id);
  if (!documents) {
    return next(new ApiError(`No documents for this id ${id}`, 404));
  }

  res.status(200).json({ data: documents });
});

exports.getAll = (Model, modelName = '') =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    // Build query
    const documentsCounts = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginate(documentsCounts)
      .filter()
      .search(modelName)
      .limitFields()
      .sort();

    // Execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;

    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
  });