const User = Object.freeze({
  MESSAGES: {
    INVALID_DATA_TO_REFRESH_TOKEN: "Invalid data to refresh token",
    INVALID_DATA_TO_VERIFY_EMAIL: "Invalid data to verify email",
    INVALID_EMAIL: "Invalid email provided",
    INVALID_REFRESH_TOKEN: "Invalid refresh token provided",
    REQUIRED_FIELD_MISSING: "Required fields are missing.",
    INVALID_PASSWORD: "Invalid password provided",
    PASSWORD_DOES_NOT_MATCH: "Invalid email or password",
    LOGIN_FAILED: "Something went wrong while login user. Please try again.",
    INVALID_AUTHENTICATION_TOKEN: "Invalid or expired token",
    SIGN_UP_FAILED: "Something went wrong while sign up. Please try again.",
    INVALID_DATA_TO_LOGIN: "Invalid data to login",
    REFRESH_TOKEN_FAILED:
      "Something went wrong while refreshing token. Please try again.",
    INVALID_DATA_TO_CHECK_EMAIL_AVAILABILITY:
      "Invalid data to check if email exist",
    REFRESH_TOKEN_HAS_EXPIRED: "Refresh token has expired",
    USER_ALREADY_SIGNED_UP: "User is already signed up",
    USER_HAS_NOT_COMPLETED_SIGN_UP_PROCESS:
      "User has not completed sign up process",
    USER_HAS_NOT_VERIFIED_FORGET_PASSWORD:
      "User has not verified forget password",
    USER_EMAIL_NOT_VERIFIED: "User email has not verified yet",
    SIGN_OUT_FAILED: "Something went wrong while sign out. Please try again.",
    INVALID_DATA_TO_SIGN_OUT_USER: "Invalid data to sign out user",
    INVALID_ROLE: "Invalid role",
    INVALID_FIRST_NAME: "Invalid first name",
    INVALID_LAST_NAME: "Invalid last name",
    INVALID_USER_TITLE: "Invalid user title",
    INVALID_DATA_TO_ADD_PERSONAL_INFO:
      "Invalid data to add personal info of user",
    PERSONAL_INFO_ALREADY_ADDED: "Personal info of user already been added.",
    INVALID_USER_ROLE_TO_ADD_PERSONAL_INFO:
      "Invalid user role to add personal info.",
    EMAIL_ALREADY_TAKEN: "Email already taken",
    INVALID_DATA_TO_ADD_ACCOUNTANT: "Invalid data to add accountant",
    ATLEAST_ONE_USER: "At least select one user for converstaion",
    ADDING_PERSONAL_INFO_FAILED:
      "Something went wrong while adding personal info of user data. Please try again.",
    FETCHING_USER_FAILED:
      "Something went wrong while fetching the user data. Please try again.",
    START_CONVERSATION_FAILED:
      "Something went wrong while creating the conversation. Please try again.",
    FETCH_CONVERSATION_FAILED:
      "Something went wrong while fetching the conversation. Please try again.",
    SEND_MESSAGE_FAILED:
      "Something went wrong while sending message. Please try again.",
    FETCHING_USER_DATA_FAILED:
      "Something went wrong while fetching user data. Please try again.",
    UPDATING_USER_DATA_FAILED:
      "Something went wrong while updating user data. Please try again.",
    SIGNUP_REQUEST_ALREADY_RECEIVED:
      "User has already requested for sign up. Please verify your email.",
    USER_ALREADY_EXIST: "User already exist",
    EMAIL_ALREADY_EXIST: "Email already exist",
    ACCOUNT_ALREADY_EXIST: "Account already exist",
    INVALID_DATA_TO_SIGNUP_USER: "Invalid data to sign up user",
    INVALID_DATA_TO_UPDATE_USER: "Invalid data to update user profile",
    UPDATE_USER_FAILED: "Update user Failed",
    USER_DOES_NOT_EXIST: "User does not exist",
    SOMETHING_WENT_WRONG: "Something went wrong. Please try again.",
    TOKEN_IS_INVALID_OR_EXPIRED: "Token is invalid or expired",
  },
});

module.exports = User;
