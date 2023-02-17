//                                    ﷽
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: "confeg.env" }); // we would not do this if the evn file just called .env
const ApiError = require("./utils/apiError");
const globalError=require('./Middlewares/errorMiddleware')
const dbConnection = require("./config/database");
const categoryRoutes = require("./Routes(Apis)/CategoryRoutes");
//connect db
dbConnection();

//express app
const app = express();

//Middlewares
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use("/api/v1/categories", categoryRoutes);

app.all('*', (req, res, next) => {

  next(new ApiError(`Can't find this route ${req.originalUrl}`, 400));
});
//Global Error Middleware
app.use(globalError);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App is working on port ${PORT}`);
});
