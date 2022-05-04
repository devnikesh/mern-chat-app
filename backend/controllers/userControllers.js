const asyncHandler = require("express-async-handler");
// const response = require("express/lib/response");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    console.log(name);
    throw new Error("Please Enter all the Fields");
  }
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already Exists!");
  }

  const user = await User.create({ name, email, password, image });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User Not Found!");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  const user = await User.findOne({ email });
  if (user) {
    console.log(email);
  }
  if (user && (await user.matchPassword(password))) {
    console.log("User Exist");

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      token: generateToken(user._id),
    });
    console.log(req.originalUrl);
  } else {
    res.status(401);
    throw new Error("Invalid Credentials!");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const searchKey = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(searchKey).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
