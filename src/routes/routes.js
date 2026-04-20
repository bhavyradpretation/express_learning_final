import {Router} from "express";
import { productsRoutes } from "./products.js";
import { userRoutes } from "./users.js";
import {authRoutes} from "./auth.router.js";

const routes = Router();

routes.use(productsRoutes);
routes.use(userRoutes)
routes.use("/auth", authRoutes);



export {routes}