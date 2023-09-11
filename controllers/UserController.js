const { ErrorCodes, UserConstants } = require("../constants");
const { Validators } = require("../utils");
const {
  getUser: getUserDetail,
  getAllUsers: getAllUserDetails,
  startConversation,
  getConversations: getAllConversation,
  getConversationDetail: getConversation,
  sendMessage: storeAndSendMessage
} = require("../services/UserService");

async function getUser(req, res) {
  try {
    const user = await getUserDetail(req.user);

    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    handleErrorResponse(
      req,
      res,
      err,
      UserConstants.MESSAGES.FETCHING_USER_FAILED
    );
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await getAllUserDetails(req.user);

    res.json({
      success: true,
      users,
    });
  } catch (err) {
    handleErrorResponse(
      req,
      res,
      err,
      UserConstants.MESSAGES.FETCHING_USER_FAILED
    );
  }
}

async function startNewConversation(req, res) {
  try {
    await startConversation(req.body, req.user);

    res.json({
      success: true,
    });
  } catch (err) {
    handleErrorResponse(
      req,
      res,
      err,
      UserConstants.MESSAGES.START_CONVERSATION_FAILED
    );
  }
}

async function getConversations(req, res) {
  try {
    const conversations = await getAllConversation(req.user);

    res.json({
      success: true,
      conversations,
    });
  } catch (err) {
    handleErrorResponse(
      req,
      res,
      err,
      UserConstants.MESSAGES.FETCH_CONVERSATION_FAILED
    );
  }
}

async function getConversationDetail(req, res) {
  try {
    const { conversationId } = req.params;
    const messages = await getConversation(conversationId);

    res.json({
      success: true,
      messages,
    });
  } catch (err) {
    handleErrorResponse(
      req,
      res,
      err,
      UserConstants.MESSAGES.FETCH_CONVERSATION_FAILED
    );
  }
}

async function sendMessage(req, res) {
  try {
    await storeAndSendMessage(req.body);

    res.json({
      success: true,
    });
  } catch (err) {
    handleErrorResponse(
      req,
      res,
      err,
      UserConstants.MESSAGES.SEND_MESSAGE_FAILED
    );
  }
}

function handleErrorResponse(req, res, err, defaultMessage) {
  console.log(
    `${req.method}:: Request failed. userId:: ${req.user.id} user:: ${
      req.user.email
    } params:: ${JSON.stringify(req.body)}`,
    err
  );

  const statusCode =
    Validators.validateCode(err.code, ErrorCodes.INTERNAL_SERVER_ERROR) ||
    ErrorCodes.INTERNAL_SERVER_ERROR;

  const message = err.reportError ? err.message : defaultMessage;

  res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = {
  getUser,
  getAllUsers,
  startNewConversation,
  getConversations,
  getConversationDetail,
  sendMessage,
};
