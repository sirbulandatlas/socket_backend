const express = require("express");

const { authenticate } = require("../middleware/Authentication");
const {
  getUser,
  getAllUsers,
  startNewConversation,
  getConversations,
  getConversationDetail,
  sendMessage,
} = require("../controllers/UserController");

const router = express.Router();

router.get("/users/me", authenticate, getUser);

router.get("/users", authenticate, getAllUsers);

router.post("/users/new-conversation", authenticate, startNewConversation);

router.get("/users/conversations", authenticate, getConversations);

router.get(
  "/users/conversations/:conversationId",
  authenticate,
  getConversationDetail
);

router.post("/users/conversations/send-message", authenticate, sendMessage);

module.exports = router;
