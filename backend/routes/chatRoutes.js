// All related to chats

const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  accessChats,
  fetchChats,
  createGroup,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require("../controllers/chatController");
const router = express.Router();

router.route("/").post(protect, accessChats);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroup);
router.route("/rename").put(protect, renameGroup);
router.route("/removeUser").put(protect, removeFromGroup);
router.route("/addUser").put(protect, addToGroup);

module.exports = router;
