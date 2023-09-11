const jsonwebtoken = require("jsonwebtoken");
const config = require("config");

class Token {
  static getLoginToken(user) {
    let loginToken = jsonwebtoken.sign(
      {
        id: user.id,
        email: user.email,
      },
      config.jwtSecretKey,
      {
        expiresIn: config.expiryAccessToken,
      }
    );

    return loginToken;
  }

  static getRefreshToken(user) {
    let refreshToken = jsonwebtoken.sign(
      {
        id: user.id,
        email: user.email,
      },
      config.jwtSecretKey,
      {
        expiresIn: config.expiryRefreshToken,
      }
    );

    return refreshToken;
  }

  static verifyToken(token, secretKey) {
    try {
      const decoded = jsonwebtoken.verify(token, secretKey);

      return decoded || false;
    } catch (err) {
      console.log(
        `verifyToken:: Could not verify the token. token:: ${token} secretKey:: ${secretKey}`,
        err
      );

      return false;
    }
  }
}

module.exports = Token;
