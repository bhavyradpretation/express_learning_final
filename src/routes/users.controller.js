import { StatusCodes } from "http-status-codes";
import { USERS } from "../shared/data.js";
import { SuccessResponse } from "../shared/responseProcessor.js";
import { BadRequestError } from "../shared/error.js";
import { User } from "../shared/models/user.model.js";
import { hash } from "bcryptjs";
import jwt from "jsonwebtoken";


const getUsersController = async (req, res)=>{
    const Users = await User.find();
    return new SuccessResponse(Users);
}

const postCreateUserController = async (req, res, next)=>{
    const {data} = req;
    console.log({data});
    data.password = await hash(data.password, 10);
    console.log({data});
    const createUser = await User.create(data);
    const newUser = createUser.toObject();
    delete newUser.password;
    return new SuccessResponse(newUser, "User created successfully", 201);
}

const getJWTController = async(req, res, next)=>{
    const token = jwt.sign({myCred: "hello@123"}, "mSecretKey", { expiresIn : '1h'})
    return new SuccessResponse({token});
}

const postVerifyTokenController = async(req, res, next)=>{
    const {token} = req.body;
    const decoded = jwt.verify(token, "mSecretKey");
    return new SuccessResponse({decoded});
}

export {
    getUsersController,
    postCreateUserController,
    getJWTController,
    postVerifyTokenController
}