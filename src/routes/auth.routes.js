import { Router } from "express";
import { postCredGetMeChain, userPostValidationChains, validate } from "../chains/validationChains/userValidation.js";
import { responseProcessor } from "../shared/responseProcessor.js";
import {signupController, loginController} from "../controllers/auth.controller.js"

const authRoutes = Router();

// login
authRoutes.post("/login", validate(postCredGetMeChain), responseProcessor(loginController));
//signup
authRoutes.post("/signup", validate(userPostValidationChains), responseProcessor(signupController));

export {
    authRoutes
}