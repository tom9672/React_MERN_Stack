import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

//@desc register User
//@route POST/api/users/register
//@access public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("Already registered");
  } else {
    const user = await User.create({ name, email, password });
    if (user) {
      res.status(201);
      res.json({
        _id: user._id,
        name: user.name,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Fail, try again");
    }
  }
});

//@desc identify user & get token
//@route POST/api/users/login
//@access public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Email or password incorrect");
  }
});

//@desc get user profile
//@route GET/api/users/profile
//@access private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not exist");
  }
});

//@desc update user profile
//@route PUT/api/users/profile
//@access private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateUser = await user.save();
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not exist");
  }
});

//@desc get all users
//@route GET/api/users
//@access private(admin only)
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//@desc delete user by id
//@route DELETE/api/users/:id
//@access private(admin only)
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "Successfully Delete" });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
