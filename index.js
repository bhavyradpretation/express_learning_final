import express from "express";
import cookieParser from "cookie-parser";
import { loggingMiddleware } from "./src/shared/middlewares/auth.middleware.js";
import {routes} from "./src/routes/routes.js"
import { StatusCodes } from "http-status-codes";
import { ApiError } from "./src/shared/error.js";
import mongoose from "mongoose";


const app = express();

const PORT = process.env.PORT;

console.log({PORT});


app.use(express.json()); // provides req.body

app.use(loggingMiddleware); // logs method and url

app.use(cookieParser()); 

app.use( "/public", express.static("public"));

app.use( "/api", routes); // registering the routes


app.get("/", (req, res)=>{
  return res.status(200).send({hello: "world !!!"});
});

app.use((error, req, res, next)=>{ // global error middleware
  if(error instanceof ApiError){
      return res.status(error.statusCode).send({
          data: { error: error.name},
          statusCode: error.statusCode,
          message: error.message
      });
  }
  return res.status(500).send({
      data: {},
      statusCode: 500,
      message: error.message
  });
});

try {
  mongoose.connect("mongodb://localhost:27017/express-2").then(()=>{
    console.log("Database is connected successfully 🎉🎉");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
    });
  })
} catch (error) {
  console.log("Something went wrong while connecting to Database ❌❌")
}