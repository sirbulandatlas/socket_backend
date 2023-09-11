const { AuthUtil, UserUtil } = require("../utilities");
const { ErrorCodes, UserConstants } = require("../constants");
const { Exception, Token, bcrypt, config } = require("../utils");
const { findUserByEmail, createUser, setAccessToken: setAccessTokenForUser } = require("../models/User");

async function signup(data) {
  console.log("signup:: Request to signup user. data:: ", data);
  AuthUtil.validateSignUpRequest(data);
  let user = await findUserByEmail(data.email);
  AuthUtil.validateUserForSignUp(user);
  data.password = await AuthUtil.createHashedPassword(data.password);
  user = await createUser(data);
  user = user[0];
  user = await setAccessToken(user);
  return user;
}

async function login(data) {
  console.log("login:: Request to login user. data:: ", data);
  AuthUtil.validateLoginRequest(data);
  let user = await findUserByEmail(data.email);
  AuthUtil.validateUserToAuthenticate(user);
  const passwordMatched = await bcrypt.compare(data.password, user.password);
  if (!passwordMatched) {
    console.log(
      `login:: Password does not match. users:: ${JSON.stringify(
        user
      )} data:: `,
      data
    );
    throw new Exception(
      UserConstants.MESSAGES.PASSWORD_DOES_NOT_MATCH,
      ErrorCodes.UNAUTHORIZED,
      { reportError: true }
    ).toJson();
  }
  user = await setAccessToken(user);
  console.log("login:: User successfully login. data:: ", data);
  return user;
}

async function refreshToken(user, data) {
  console.log(
    `refreshToken:: Request to refresh token. userId:: ${user.id} user:: ${user.email} data:: `,
    data
  );
  AuthUtil.validateRefreshTokenRequest(data);
  const decoded = Token.verifyToken(data.refresh_token, config.jwtSecretKey);
  AuthUtil.validateRefreshToken(user, decoded);
  user = await setAccessToken(user);
  console.log(
    `refreshToken:: Token successfully refreshed. userId:: ${user.id}, user:: ${user.email} data:: `,
    data
  );
  return user;
}

const setAccessToken = async (user) => {
  console.log("setAccessToken:: Setting access token of user. user:: ", user);
  const accessToken = Token.getLoginToken(user);
  const refreshToken = Token.getRefreshToken(user);
  user = await setAccessTokenForUser(user.id, accessToken, refreshToken);
  user = UserUtil.updateUserData(user[0]);
  console.log(
    "setAccessToken:: access token of user successfully set. user:: ",
    user
  );
  return user;
};

module.exports = {
  signup,
  login,
  refreshToken,
  setAccessToken,
};
