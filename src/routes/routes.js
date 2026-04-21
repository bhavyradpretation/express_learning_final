import {Router} from "express";
import { productsRoutes } from "./product.routes.js";
import { userRoutes } from "./user.routes.js";
import {authRoutes} from "./auth.routes.js";

const routes = Router();

routes.use(productsRoutes);
routes.use(userRoutes)
routes.use("/auth", authRoutes);



export {routes}