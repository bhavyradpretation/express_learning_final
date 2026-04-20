import { Router } from "express";
import { postCredGetMeChain, userPostValidationChains, validate } from "../../middleware.js";
import { responseProcessor } from "../shared/responseProcessor.js";
import {signupController, loginController} from "./signup.controller.js"

const authRoutes = Router();

// login
authRoutes.post("/login", validate(postCredGetMeChain), responseProcessor(loginController));
//signup
authRoutes.post("/signup", validate(userPostValidationChains), responseProcessor(signupController));

export {
    authRoutes
}