const { saveMessageDetails } = require("../models/Message");
const { findUserExceptCurrent } = require("../models/User");
const { createRoomParticipant } = require("../models/Participants");
const {
  getDialogues,
  getDialogueById,
  createNewDialogue,
  getDialogueMessages,
} = require("../models/Dialogues");
const { UserUtil } = require("../utilities");
const { transformUsersData } = require("../utilities/UserUtil");
const Socket = require("./Socket");

function getUser(user) {
  user = UserUtil.transformUserData(user);

  console.log(
    `getUser:: User's data successfully fetched. userId::${user.id} user:: ${user.email}`
  );

  return user;
}

async function getAllUsers({ email }) {
  const users = await findUserExceptCurrent(email);
  return transformUsersData(users, true);
}

async function startConversation(
  { members, title, type },
  { id: currentUserId }
) {
  UserUtil.validateRequestForConversation(members);

  const [conversation] = await createNewDialogue({
    title,
    type,
  });

  const participantRecords = members.map((userId) => ({
    dialogue_id: conversation.id,
    user_id: userId,
  }));

  participantRecords.push({
    user_id: currentUserId,
    dialogue_id: conversation.id,
  });

  await createRoomParticipant(participantRecords);
  const conversationData = await getDialogueById(conversation.id);
  Socket.io.emit("new-conversation", conversationData);
}

async function getConversations({ id }) {
  const dialogues = await getDialogues(id);

  return dialogues.map((dialogue) => {
    if (dialogue.type === "group") return dialogue;

    const member = dialogue.members.find(member => member.user_id !== id);

    if (!member) return dialogue;

    return {
      ...dialogue,
      title: member.username
    };
  });
}

async function getConversationDetail(conversationId) {
  return getDialogueMessages(conversationId);
}

async function sendMessage({ content, senderId, dialogueId, sendBy }) {
  UserUtil.validateRequestForMessage(content, senderId, dialogueId, sendBy);

  const data = {
    content,
    sender_id: senderId,
    send_by: sendBy,
    dialogue_id: dialogueId,
  };

  const [response] = await saveMessageDetails(data);

  Socket.io.to(dialogueId + "-conversations").emit("new-message", response);
}

module.exports = {
  getUser,
  getAllUsers,
  startConversation,
  getConversations,
  getConversationDetail,
  sendMessage,
};
