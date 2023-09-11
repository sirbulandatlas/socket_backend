const { ErrorCodes, UserConstants } = require("../constants");

const AuthService = require("../services/AuthService");
const { Validators } = require("../utils");

async function signup(req, res) {
  try {
    const user = await AuthService.signup(req.body);
    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    handleErrorResponse(req, res, err, UserConstants.MESSAGES.SIGN_UP_FAILED);
  }
}

async function login(req, res) {
  try {
    const user = await AuthService.login(req.body);
    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    handleErrorResponse(req, res, err, UserConstants.MESSAGES.LOGIN_FAILED);
  }
}

async function refreshToken(req, res) {
  try {
    const data = await AuthService.refreshToken(req.user, req.body);
    res.json({
      success: true,
      data,
    });
  } catch (err) {
    const message = UserConstants.MESSAGES.REFRESH_TOKEN_FAILED;
    handleErrorResponse(req, res, err, message);
  }
}

function handleErrorResponse(req, res, err, defaultMessage) {
  console.log(`${req.method}:: Request failed. data:: `, req.body, err);
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
  signup,
  login,
  refreshToken,
};
