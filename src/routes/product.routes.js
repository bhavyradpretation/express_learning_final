import {Router} from "express";
import { PRODUCTS } from "../shared/data.js";
import { paginationMiddleware } from "../shared/middlewares/pagination.middleware.js";
import { ApiError } from "../shared/error.js";
import { StatusCodes } from "http-status-codes";


const JWT_SECRET = process.env.JWT_SECRET;

const productsRoutes = Router();

// productsRoutes.get("/products", paginationMiddleware(PRODUCTS) ,responseProcessor(getUsersController));
// productsRoutes.post("/products", validate(productPostValidationChains) ,responseProcessor(getProductController));
// productsRoutes.get("/products:id", resolveUserById ,responseProcessor(getProductByIdController));
// productsRoutes.put("/products:id", resolveUserById ,responseProcessor(putProductByIdController));
// productsRoutes.patch("/products:id", resolveUserById ,responseProcessor(patchProductByIdController));
// productsRoutes.delete("/products:id", resolveUserById ,responseProcessor(deleteProductByIdController));

export {productsRoutes}
