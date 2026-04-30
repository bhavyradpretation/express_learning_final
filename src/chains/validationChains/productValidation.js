import { body } from "express-validator";

const productPostValidationChains = [
    body("name")
        .notEmpty().withMessage("Name is required")
        .isString().withMessage("Name must be a string")
        .isLength({ min: 2, max: 100 }).withMessage("Name must be between 2 and 100 characters"),
    body("price")
        .notEmpty().withMessage("Price is required")
        .isNumeric().withMessage("Price must be a number")
        .isFloat({ min: 0 }).withMessage("Price must be a positive number")
]

const productPutPatchValidationChain = [
    body("name")
        .optional()
        .isString().withMessage("Name must be a string")
        .isLength({ min: 2, max: 100 }).withMessage("Name must be between 2 and 100 characters"),
    body("price")
        .optional()
        .isNumeric().withMessage("Price must be a number")
        .isFloat({ min: 0 }).withMessage("Price must be a positive number")
]

export {
    productPostValidationChains,
    productPutPatchValidationChain
}