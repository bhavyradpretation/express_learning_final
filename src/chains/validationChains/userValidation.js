import { body } from "express-validator";

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

const userPutPatchValidationChain =[
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
    validate,
    userPostValidationChains,
    postCredGetMeChain,
    userPutPatchValidationChain
}