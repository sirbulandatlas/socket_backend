const { ErrorCodes, UserConstants } = require("../constants");
const { getAuthenticateUser } = require("../models/User");

const { Validators, Exception, jwt, config } = require("../utils");

async function authenticate(req, res, next) {
  try {
    let token = Validators.isValidStr(req.headers.authorization)
      ? req.headers.authorization.split(" ")
      : null;

    if (!Array.isArray(token) || token.length < 1) {
      handleTokenError(res, UserConstants.MESSAGES.TOKEN_IS_INVALID_OR_EXPIRED);
    }

    token = token[1];

    const decoded = jwt.verify(token, config.jwtSecretKey);

    if (!decoded || !decoded.id || !decoded.email) {
      handleTokenError(
        res,
        UserConstants.MESSAGES.TOKEN_IS_INVALID_OR_EXPIRED,
        token,
        decoded
      );
    }

    const user = await getAuthenticateUser(
      decoded.id,
      decoded.email,
      token
    );

    if (!user) {
      handleTokenError(
        res,
        UserConstants.MESSAGES.TOKEN_IS_INVALID_OR_EXPIRED,
        token,
        decoded
      );
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(ErrorCodes.UNAUTHORIZED).json({
      message: UserConstants.MESSAGES.INVALID_AUTHENTICATION_TOKEN,
    });
  }
}

function handleTokenError(res, errorMessage, token, decoded) {
  console.log(
    `authenticate:: Token is invalid. token:: ${token} decoded:: `,
    decoded
  );
  const exception = new Exception(
    errorMessage,
    ErrorCodes.CONFLICT_WITH_CURRENT_STATE,
    { reportError: true }
  );
  throw exception.toJson();
}

module.exports = {
  authenticate,
};
