import { StatusCodes } from "http-status-codes";
import { SuccessResponse } from "../shared/responseProcessor.js";
import { compare, hash } from "bcryptjs";
import { User } from "../shared/models/user.model.js";
import { BadRequestError } from "../shared/error.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV;

const signupController = async(req, res, next)=>{
    const {data} = req;
    console.log({data});
    const createUser = await User.create(data);
    // const newUser = new User(data); // sync or async ? --> sync
    // const createUser = await newUser.save(); // 
    const userObj = createUser.toObject();
    delete userObj.password;
    return new SuccessResponse(userObj, "User Created Successfully", StatusCodes.CREATED);
    // login
}

const loginController = async(req, res, next)=>{
    const {data} = req;
    const {username} = data;
    console.log({data});
    const findUser = await User.findOne({username}).select("+password");
    console.log({findUser});
    if(!findUser) return new BadRequestError("Invalid Credentials");
    const match = await compare(data.password, findUser.password);
    if(!match) return new BadRequestError("Invalid Credentials");
    console.log({id: findUser.id});
    const token = jwt.sign({id: findUser._id}, JWT_SECRET, { expiresIn : '3h'})
    res.cookie("token", token, {
        maxAge: 1000*60*60*3,
        httpOnly: true, // prevent xss attacks
        sameSite: "strict", // csrf attacks
        secure: NODE_ENV != "Development",
    });
    return new SuccessResponse({token});
}

export {
    signupController,
    loginController
}

