const { getUser, getAllUsers, startConversation, getConversations, getConversationDetail, sendMessage } = require("./UserService");
const { UserUtil } = require("../utilities");
const { findUserExceptCurrent } = require("../models/User");
const { createNewDialogue: createNewConversation, getDialogues: getConversationsFromModel, getDialogueMessages: getConverstaionMessages } = require("../models/Dialogues");
const { saveMessageDetails } = require("../models/Message");
const { createRoomParticipant } = require("../models/Participants");

jest.mock("../models/User");
jest.mock("../models/Dialogues");
jest.mock("../models/Message");
jest.mock("../models/Participants");
jest.mock("../utilities/UserUtil");
jest.mock("../services/Socket");
jest.mock("../services/Socket", () => ({
  io: {
    to: jest.fn().mockReturnThis(),
    emit: jest.fn(),
  },
}));

describe("UserService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should transform user data and return user", () => {
    const user = {
      id: 1,
      email: "test@example.com",
      password: "hashedpassword",
    };
    const transformedUser = { id: 1, email: "test@example.com" };

    UserUtil.transformUserData.mockReturnValue(transformedUser);

    const result = getUser(user);

    expect(result).toEqual(transformedUser);
    expect(UserUtil.transformUserData).toHaveBeenCalledWith(user);
  });

  it("should get all users except current user", async () => {
    const email = "test@example.com";
    const users = [
      {
        id: 2,
        email: "user2@example.com",
        username: "user2",
        password: "hashedpassword",
      },
      {
        id: 3,
        email: "user3@example.com",
        username: "user3",
        password: "hashedpassword",
      },
    ];
    const transformedUsers = [
      { email: "user2@example.com", id: 2 },
      { email: "user3@example.com", id: 3 },
    ];

    findUserExceptCurrent.mockResolvedValue(users);
    UserUtil.transformUsersData.mockReturnValue(transformedUsers);

    const result = await getAllUsers({ email });

    expect(result).toEqual(transformedUsers);
    expect(findUserExceptCurrent).toHaveBeenCalledWith(email);
    expect(UserUtil.transformUsersData).toHaveBeenCalledWith(users, true);
  });

  it("should start a conversation and create participants", async () => {
    const members = [2, 3];
    const title = "Test Conversation";
    const type = "group";
    const currentUserId = 1;
    const dialogueId = 1;

    createNewConversation.mockResolvedValue([
      { id: dialogueId },
    ]);
    createRoomParticipant.mockResolvedValue([]);

    await startConversation(
      { members, title, type },
      { id: currentUserId }
    );

    expect(createNewConversation).toHaveBeenCalledWith({
      title,
      type,
    });
    expect(createRoomParticipant).toHaveBeenCalledWith([
      { dialogue_id: dialogueId, user_id: 2 },
      { dialogue_id: dialogueId, user_id: 3 },
      { dialogue_id: dialogueId, user_id: currentUserId },
    ]);
  });

  it("should get conversations for a user", async () => {
    const userId = 1;
    const conversations = [
      { id: 1, title: "Conversation 1", type: "one_to_one", members: [] },
      { id: 2, title: "Conversation 2", type: "group", members: [] },
    ];

    getConversationsFromModel.mockResolvedValue(conversations);

    const result = await getConversations({ id: userId });

    expect(result).toEqual(conversations);
    expect(getConversationsFromModel).toHaveBeenCalledWith(userId);
  });

  it("should get conversation details", async () => {
    const dialogueId = 1;
    const messages = [
      { id: 1, content: "Hello", sender_id: 2, send_by: "user123" },
      { id: 2, content: "Hi", sender_id: 1, send_by: "user456" },
    ];

    getConverstaionMessages.mockResolvedValue(messages);

    const result = await getConversationDetail(dialogueId);

    expect(result).toEqual(messages);
    expect(getConverstaionMessages).toHaveBeenCalledWith(
      dialogueId
    );
  });

  it("should send a message and emit event", async () => {
    const content = "Hello";
    const senderId = 1;
    const dialogueId = 1;
    const sendBy = "user123";

    const messageData = {
      content,
      sender_id: senderId,
      send_by: sendBy,
      dialogue_id: dialogueId,
    };
    const insertedMessage = { id: 1, ...messageData };

    saveMessageDetails.mockResolvedValue([insertedMessage]);

    const mockToFn = jest.fn().mockReturnThis();
    const mockEmitFn = jest.fn();
    const mockSocket = {
      to: mockToFn,
      emit: mockEmitFn,
    };
    require("./Socket").io = {
      to: mockToFn,
      emit: mockEmitFn,
    };

    await sendMessage({
      content,
      senderId,
      dialogueId,
      sendBy,
    });

    expect(saveMessageDetails).toHaveBeenCalledWith(messageData);
    expect(mockEmitFn).toHaveBeenCalledWith("new-message", insertedMessage);
  });
});
