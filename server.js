//                                    ﷽
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");

dotenv.config({ path: "confeg.env" }); // we would not do this if the evn file just called .env
const ApiError = require("./utils/apiError");
const globalError = require("./Middlewares/errorMiddleware");
const dbConnection = require("./config/database");
//Routes
const categoryRoutes = require("./Routes(Apis)/CategoryRoutes");
const subCategoryRoutes = require("./Routes(Apis)/subCategoryRoutes");
const BrandRoute = require("./Routes(Apis)/BrandRoutes");
const ProductRoute = require("./Routes(Apis)/ProductRoutes");
//connect db
dbConnection();

//express app
const app = express();
//Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/subcategories", subCategoryRoutes);
app.use("/api/v1/brands", BrandRoute);
app.use("/api/v1/products", ProductRoute);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route ${req.originalUrl}`, 400));
});
//Global Error Middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App is working on port ${PORT}`);
});
// handling the rejections outside express ( Event ==> listen ==> callback(err))
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Error :${err.name} | ${err.massage}`);
  // if i jsut said exit it will end every running requests
  // so i should do the next
  server.close(() => {
    console.log("Shutting down the app.... ");
    process.exit(1);
  });
});
