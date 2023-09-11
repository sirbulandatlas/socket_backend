const { ErrorCodes, UserConstants } = require("../constants");

const { Exception } = require("../utils");

class UserUtil {
  static transformUsersData(users, deleteAccess) {
    if (!Array.isArray(users) || !users.length) {
      return users;
    }

    return users.map((user) => UserUtil.transformUserData(user, deleteAccess));
  }

  static transformUserData(user, deleteAccess) {
    if (!user) {
      return user;
    }

    delete user.refresh_token;
    if (deleteAccess) delete user.access_token;
    delete user.password;

    return user;
  }

  static updateUserData(user) {
    if (!user) {
      return user;
    }

    delete user.password;

    return user;
  }

  static createReturnData(user) {
    const data = {};

    data.user = user;

    return data;
  }

  static validateRequestForConversation(members) {
    if (!Array.isArray(members) || !members.length) {
      console.log(
        `validateRequestForConversation:: At least select one user for converstaion. user:: ${members}`
      );

      throw new Exception(
        UserConstants.MESSAGES.ATLEAST_ONE_USER,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      ).toJson();
    }
  }

  static validateRequestForMessage(content, senderId, dialogueId, sendBy) {
    if (!dialogueId || !senderId || !content || !sendBy) {
      console.log("validateMessageFields:: Required fields are missing.");

      throw new Exception(
        UserConstants.MESSAGES.REQUIRED_FIELD_MISSING,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      ).toJson();
    }
  }
}

module.exports = UserUtil;
