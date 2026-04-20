import { body, checkSchema, matchedData, validationResult } from "express-validator";
import { USERS } from "./src/shared/data.js";
import { isValidObjectId } from "mongoose";
import { BadRequestError } from "./src/shared/error.js";

const paginationMiddleware = (model)=>{
    return (req, res, next)=>{
        // const page = parseInt(req.query.page) || 1;
        // const limit = parseInt(req.query.limit) || 4;
        // const startIndex =(page-1)*limit;
        // const endIndex = page*limit;
        // console.log({model});
        // const result = {
        //     result: model.slice(startIndex, endIndex)
        // }
        // if(endIndex < model.length) result.nextPage = page+1;
        // if(page > 1) result.prevPage = page-1;
        // req.result = result;
        next();
    }
}

const loggingMiddleware = (req, res, next) =>{
    console.log(`Request Method: ${req.method}, Request URL : ${req.url}`);
    next();
}
const postUserMiddleware = (req, res, next) =>{
    const {body} = req;
    if(!body.username || !body.displayName)
        return res.status(400).send({message: "Must enter username and displayName !!"});
    // username ---> string[5,30], displayName ---> string[5,30]
    next();
}

const resolveUserById = (req, res, next) => {
    const { body, params : { id }} = req;
    req.userId = id;
    if(!isValidObjectId(id)) return next(new BadRequestError("Not valid mongo ID !!"));
    next();
}

const myMiddleware1=(req, res, next)=>{
    console.log(`myMiddleware1 is executed`);
    next();
}
const myMiddleware2=(req, res, next)=>{
    console.log(`myMiddleware2 is executed`);
    next();
}
const myMiddleware3=(req, res, next)=>{
    console.log(`myMiddleware3 is executed`);
    next();
}
const myMiddleware4=(req, res, next)=>{
    console.log(`myMiddleware4 is executed`);
    next();
}

const postCredGetMeChain = [
    body("username")
        .notEmpty()
        .withMessage("username cannot be empty !")
        .isString()
        .withMessage("username must be a string !")
        .isLength({min: 3, max: 30})
        .withMessage("username sould be between [3, 30] !"),
    body("password")
        .notEmpty()
        .withMessage('Password is required.')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long.')
]

const userPostValidationChains = [
    body("username")
        .notEmpty()
        .withMessage("username cannot be empty !")
        .isString()
        .withMessage("username must be a string !")
        .isLength({min: 3, max: 30})
        .withMessage("username sould be between [3, 30] !"),
    body("displayName")
        .notEmpty()
        .withMessage("displayName cannot be empty!")
        .isString()
        .withMessage("displayName must be a string !")
        .isLength({ min: 3, max: 30 })
        .withMessage("displayName must be between [3, 30] !"),
    body("password")
        .notEmpty()
        .withMessage('Password is required.')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long.')
]

const userPutValidationChain =[
    body("username")
        .notEmpty()
        .withMessage("username cannot be empty !")
        .isString()
        .withMessage("username must be a string !")
        .isLength({min: 3, max: 30})
        .withMessage("username sould be between [3, 30] !"),
    body("displayName")
        .notEmpty()
        .withMessage("displayName cannot be empty!")
        .isString()
        .withMessage("displayName must be a string !")
        .isLength({ min: 3, max: 30 })
        .withMessage("displayName must be between [3, 30] !"),
]

const validateValidationChains = (req, res, next)=>{
    const result = validationResult(req);
    if (!result.isEmpty())
        return res.status(400).send({ error: result.array() });
    req.data = matchedData(req);
    next();
}

const validate = (validationChains)=>{
    return [...validationChains, validateValidationChains]
}

export {
    loggingMiddleware, 
    postUserMiddleware, 
    resolveUserById,
    myMiddleware1,
    myMiddleware2,
    myMiddleware3,
    myMiddleware4,
    validate,
    paginationMiddleware,
    userPostValidationChains,
    postCredGetMeChain,
    userPutValidationChain
}