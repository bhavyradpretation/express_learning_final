import { StatusCodes } from "http-status-codes";
import { SuccessResponse } from "../shared/responseProcessor.js";
import { BadRequestError } from "../shared/error.js";
import { User } from "../shared/models/user.model.js";
import { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

// const getUsersController = async (req, res)=>{
//     const Users = await User.find();
//     return new SuccessResponse(Users);
// }

const getUsersController = async (req, res) => {
  const { limit, skip, page } = req.pagination;

  const Users = await User.find().skip(skip).limit(limit);

  const total = await User.countDocuments();

  return new SuccessResponse({
    data: Users,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
};

const postCreateUserController = async (req, res, next) => {
  const { data } = req;
  console.log({ data });
  data.password = await hash(data.password, 10);
  console.log({ data });
  const createUser = await User.create(data);
  const newUser = createUser.toObject();
  delete newUser.password;
  return new SuccessResponse(newUser, "User created successfully", 201);
};

const getJWTController = async (req, res, next) => {
  const token = jwt.sign({ myCred: "hello@123" }, "mSecretKey", {
    expiresIn: "1h",
  });
  return new SuccessResponse({ token });
};

const postVerifyTokenController = async (req, res, next) => {
  const { token } = req.body;
  const decoded = jwt.verify(token, "mSecretKey");
  return new SuccessResponse({ decoded });
};

const deleteUserByIdController = async (req, res, next) => {
  try {
    const { userId } = req;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return next(new BadRequestError("Invalid userID"));
    return res.status(200).send(deletedUser);
  } catch (error) {
    next(error);
  }
};

const patchUserByIdController = (req, res) => {
  const { body, userIndex } = req;
  USERS[userIndex] = { ...USERS[userIndex], ...body };
  res.sendStatus(200);
};

const putUserByIdController = async (req, res, next) => {
  try {
    const { data, userId } = req;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: data },
      { new: true, runValidators: true },
    );
    // const findUser = await User.findById(userId);
    // if(data.displayName) findUser.displayName = data.displayName;
    // if(data.username) findUser.username = data.username;
    // const updatedUser = await findUser.save()
    if (!updatedUser) return next(new BadRequestError("Invalid userID"));
    return res.status(200).send(updatedUser);
  } catch (error) {
    next(error);
  }
};

const getUserByIdController = async (req, res, next) => {
  const { userId } = req;
  const findUser = await User.findById(userId);
  if (!findUser) return next(new BadRequestError("Invalid userID"));
  return res.status(200).send(findUser);
};

const postUserMeController = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const findUser = USERS.find((data) => data.username === username);
    const match = await compare(password, findUser.password);
    console.log({ username, password });
    if (match) return res.status(StatusCodes.OK).send(findUser);
    else next(new AuthorizationError("Invalid Credentials"));
  } catch (error) {
    next(error);
  }
};

const getUserMeController = async (req, res, next) => {
  try {
    const { cookies } = req;
    let token;
    if (cookies && cookies.token) token = cookies.token;
    else return next(new AuthorizationError("Please login !!"));
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log({ decoded });
    const { id } = decoded;
    const findUser = await User.findById(id);
    if (!findUser) return next(new AuthorizationError("Invalid Credentials"));
    return res.status(StatusCodes.OK).send(findUser);
  } catch (error) {
    next(error);
  }
}

const getCokkies = (req, res) => {
  console.log(req.cookies);
  // console.log({"req.headers.cookie": req.headers.cookie});
  return res.status(200).send(USERS[0]);
}

const setCokkies = (req, res) => {
  res.cookie("hello", "world", { maxAge: 2 * 60 * 1000 });
  return res.status(200).send(USERS[0]);
}

export {
  getUsersController,
  postCreateUserController,
  getJWTController,
  postVerifyTokenController,
  deleteUserByIdController,
  patchUserByIdController,
  putUserByIdController,
  getUserByIdController,
  postUserMeController,
  getUserMeController,
  getCokkies,
  setCokkies
};
