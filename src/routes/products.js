import {Router} from "express";
import { PRODUCTS } from "../shared/data.js";
import { paginationMiddleware } from "../../middleware.js";
import { ApiError } from "../shared/error.js";
import { StatusCodes } from "http-status-codes";

const productsRoutes = Router();

productsRoutes.get("/products", paginationMiddleware(PRODUCTS) ,(req, res, next)=>{
    // const myError = new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "database connection error");
    // const myError = new Error("database connection error");
    next();
    return res.status(200).send(req.result);
});

export {productsRoutes}