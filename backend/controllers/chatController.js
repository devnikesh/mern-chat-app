const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const accessChats = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId not sent");
    return res.sendStatus(400);
  }
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      {
        users: {
          $elemMatch: { $eq: req.user._id },
        },
      },
      {
        users: {
          $elemMatch: { $eq: userId },
        },
      },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
  }
  try {
    const createChat = await Chat.create(chatData);
    const fullChat = await Chat.findOne({ _id: createChat._id }).populate(
      "users",
      "-password"
    );
    res.status(200).send(fullChat);
  } catch (err) {
    res.status(401);
    throw new Error(err.message);
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        result = await User.populate(result, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(result);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const createGroup = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the Fields!" });
  }
  var users = JSON.parse(req.body.users);
  if (users < 2) {
    return res.status(400).send({ message: "More than 2 users is required!" });
  }
  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      users: users,
      isGroupChat: true,
      groupName: req.body.name,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({
      _id: groupChat._id,
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error("Cannot Create!");
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, groupName } = req.body;
  const updateGroupName = await Chat.findByIdAndUpdate(
    chatId,
    {
      groupName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updateGroupName) {
    res.status(404);
    throw new Error("Chat Not Found!");
  } else {
    res.json(updateGroupName);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const addUser = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!addUser) {
    res.status(400);
    throw new Error("Cannot Add User");
  }
  res.json(addUser);
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  const removeUser = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removeUser) {
    res.status(400);
    throw new Error("Cannot Add User");
  }
  res.json(removeUser);
});

module.exports = {
  accessChats,
  fetchChats,
  createGroup,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
