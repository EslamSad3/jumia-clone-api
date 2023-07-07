const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const categoryRoute = require("./routes/categoryRoute")
const SubCategoryRoute = require("./routes/subCategoryRoute")
dotenv.config({path: "config.env",});
const globalError = require("./middlewares/errorMiddleWare")
const ApiError = require("./utils/apiError")



// connect to DB
const dbConnection = require("./config/database")
dbConnection()


// Create Instance
const app = express();
// middlewares
app.use(express.json()); // stringfy DATA

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode : ${process.env.NODE_ENV}`);
}

// Mount Routes

app.use("/api/v1/categories",categoryRoute)
app.use("/api/v1/subcategories",SubCategoryRoute)

app.all("*",(req,res,next)=>{
  // Create Error And Send it To Error Handlre
  // const err = new Error(`Can't Find this route : ${req.originalUrl}`)
  // next(err.message)
  next( new ApiError(`Can't Find this route : ${req.originalUrl}`, 400))
})


// Global Error Handlering middleWare

app.use(globalError)



const port = process.env.PORT || 8000;
const server = app.listen(port, () => console.log(`App running on port : ${port}`));



// Handle Errors outSide Express ==>> error must be in a promise function like dbConnection

process.on("unhandledRejection",(err)=>{
  console.error(`unhandledRejection Error : ${err}`);
  server.close(()=>{
    console.error("Shutting Down ....");
    process.exit(1)
  })
})