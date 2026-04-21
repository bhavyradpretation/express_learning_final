import {
  body,
  checkSchema,
  matchedData,
  validationResult,
} from "express-validator";
import { isValidObjectId } from "mongoose";
import { BadRequestError } from "../error.js";

const loggingMiddleware = (req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL : ${req.url}`);
  next();
};
const postUserMiddleware = (req, res, next) => {
  const { body } = req;
  if (!body.username || !body.displayName)
    return res
      .status(400)
      .send({ message: "Must enter username and displayName !!" });
  // username ---> string[5,30], displayName ---> string[5,30]
  next();
};

const resolveUserById = (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;
  req.userId = id;
  if (!isValidObjectId(id))
    return next(new BadRequestError("Not valid mongo ID !!"));
  next();
};

export { loggingMiddleware, postUserMiddleware, resolveUserById };
