import {Router} from "express";
import { PRODUCTS } from "../shared/data.js";
import { paginationMiddleware } from "../shared/middlewares/pagination.middleware.js";
import { ApiError } from "../shared/error.js";
import { StatusCodes } from "http-status-codes";
import { deleteProductByIdController, getProductByIdController, getProductController, patchProductByIdController, postCreateProductController, putProductByIdController } from "../controllers/product.controller.js";
import { productPostValidationChains, productPutPatchValidationChain } from "../chains/validationChains/productValidation.js";
import { resolveById } from "../shared/middlewares/auth.middleware.js";


const JWT_SECRET = process.env.JWT_SECRET;

const productsRoutes = Router();

productsRoutes.get("/products", paginationMiddleware(PRODUCTS) ,responseProcessor(getProductController));
productsRoutes.post("/products", validate(productPostValidationChains) ,responseProcessor(postCreateProductController));
productsRoutes.get("/products:id", resolveById ,responseProcessor(getProductByIdController));
productsRoutes.put("/products:id", resolveById ,validate(productPutPatchValidationChain),responseProcessor(putProductByIdController));
productsRoutes.patch("/products:id", resolveById ,validate(productPutPatchValidationChain),responseProcessor(patchProductByIdController));
productsRoutes.delete("/products:id", resolveById ,responseProcessor(deleteProductByIdController));

export {productsRoutes}
