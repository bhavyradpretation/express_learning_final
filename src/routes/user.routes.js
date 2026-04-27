import { Router } from "express";
import { paginationMiddleware } from "../shared/middlewares/pagination.middleware.js";
import { resolveUserById } from "../shared/middlewares/auth.middleware.js";
import {
  getUsersController,
  postCreateUserController,
  getJWTController,
  postVerifyTokenController,
  deleteUserByIdController,
  patchUserByIdController,
  putUserByIdController,
  getUserByIdController,
  postUserMeController,
  getUserMeController,
  getCokkies,
  setCokkies,
} from "../controllers/users.controller.js";
import {
  userPostValidationChains,
  postCredGetMeChain,
  validate,
  userPutPatchValidationChain,
} from "../chains/validationChains/userValidation.js";
import { responseProcessor } from "../shared/responseProcessor.js";
import { compare, hash } from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { AuthorizationError, BadRequestError } from "../shared/error.js";
import { User } from "../shared/models/user.model.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const userRoutes = Router();

userRoutes.get("/set-cookie", setCokkies);
userRoutes.get("/get-cookie", getCokkies);
userRoutes.get("/get-jwt", responseProcessor(getJWTController));
userRoutes.post("/verify-jwt", responseProcessor(postVerifyTokenController));
userRoutes.get("/users",paginationMiddleware(),responseProcessor(getUsersController),);
userRoutes.post("/users",validate(userPostValidationChains),responseProcessor(postCreateUserController),);
userRoutes.get("/users/me", responseProcessor(getUserMeController));
userRoutes.post("/users/me",validate(postCredGetMeChain),responseProcessor(postUserMeController));
userRoutes.get("/users/:id", resolveUserById, responseProcessor(getUserByIdController) );
userRoutes.put("/users/:id",resolveUserById,validate(userPutPatchValidationChain),responseProcessor(putUserByIdController));
userRoutes.patch("/users/:id", resolveUserById,validate(userPutPatchValidationChain), responseProcessor(patchUserByIdController) );
userRoutes.delete("/users/:id", resolveUserById, responseProcessor(deleteUserByIdController));

export { userRoutes };
