import {Router} from "express";
import { paginationMiddleware, resolveUserById, userPostValidationChains, userPutValidationChain, postCredGetMeChain, validate } from "../../middleware.js";
import { getUsersController, postCreateUserController, getJWTController, postVerifyTokenController } from "./users.controller.js";
import { USERS } from "../shared/data.js";
import { responseProcessor } from "../shared/responseProcessor.js";
import { compare, hash } from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { AuthorizationError, BadRequestError } from "../shared/error.js";
import { User } from "../shared/models/user.model.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const userRoutes = Router();

userRoutes.get("/set-cookie",(req, res)=>{
    res.cookie("hello", "world", {maxAge: 2*60*1000});
    return res.status(200).send(USERS[0]);
})

userRoutes.get("/get-cookie",(req, res)=>{
    console.log(req.cookies);
    // console.log({"req.headers.cookie": req.headers.cookie});
    return res.status(200).send(USERS[0]);
})

userRoutes.get("/get-jwt", responseProcessor(getJWTController))
userRoutes.post("/verify-jwt", responseProcessor(postVerifyTokenController))


userRoutes.get("/users", paginationMiddleware(USERS), responseProcessor(getUsersController));


userRoutes.post("/users", validate(userPostValidationChains), responseProcessor(postCreateUserController))

userRoutes.get("/users/me", async(req, res, next) =>{
    try {
        const {cookies} = req;
        let token;
        if(cookies && cookies.token) token = cookies.token;
        else return next(new AuthorizationError("Please login !!"));
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log({decoded});
        const {id} = decoded;
        const findUser = await User.findById(id);
        if(!findUser) return next((new AuthorizationError("Invalid Credentials")));
        return res.status(StatusCodes.OK).send(findUser);
    } catch (error) {
        next(error)
    }
})
userRoutes.post("/users/me", validate(postCredGetMeChain) , async(req, res, next) =>{
    try {
        const {username, password} = req.body;
        const findUser = USERS.find((data)=> data.username === username);
        const match = await compare(password, findUser.password);
        console.log({username, password});
        if(match)
        return res.status(StatusCodes.OK).send(findUser);
        else next(new AuthorizationError("Invalid Credentials"));
    } catch (error) {
        next(error)
    }
})


userRoutes.get("/users/:id", resolveUserById, async (req, res, next)=>{
    const {userId} = req;
    const findUser = await User.findById(userId);
    if(!findUser) return next(new BadRequestError("Invalid userID"))
    return res.status(200).send(findUser);
})


userRoutes.put("/users/:id", resolveUserById, validate(userPutValidationChain) ,async (req, res, next) => {
    try {
        const {data, userId} = req;
        const updatedUser = await User.findByIdAndUpdate(userId, {$set: data}, {new: true, runValidators: true});
        // const findUser = await User.findById(userId);
        // if(data.displayName) findUser.displayName = data.displayName;
        // if(data.username) findUser.username = data.username;
        // const updatedUser = await findUser.save()
        if(!updatedUser) return next(new BadRequestError("Invalid userID"));
        return res.status(200).send(updatedUser);
    } catch (error) {
        next(error);
    }
})


userRoutes.patch("/users/:id", resolveUserById, (req, res) => {
    const { body, userIndex} = req;
    USERS[userIndex] = { ...USERS[userIndex], ...body };
    res.sendStatus(200);
})



userRoutes.delete("/users/:id", resolveUserById, async (req, res, next) => {
    try {
        const {userId} = req;
        const deletedUser = await User.findByIdAndDelete(userId);
        if(!deletedUser) return next(new BadRequestError("Invalid userID"));
        return res.status(200).send(deletedUser);
    } catch (error) {
        next(error);
    }
})


export {userRoutes}