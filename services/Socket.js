const { Server } = require("socket.io");
const config = require("config");
const {
  getUserSocketId,
  addUser,
  removeUser: removeFromDatabase,
} = require("../models/ActiveUser");

class SocketService {
  constructor() {
    this.io;
  }

  static initialize(server) {
    this.io = new Server(server, {
      cors: {
        origin: config.frontendUrl,
        methods: ["GET", "POST"],
        transports: ["websocket", "polling"],
        credentials: true,
      },
      allowEIO3: true,
    });

    this.io.use((socket, next) => {
      if (socket.handshake.query.socketId)
        socket.id = socket.handshake.query.socketId;
      next();
    });

    this.io.on("connection", (socket) => {
      console.log("socket.io is connected", socket.id);

      socket.on("new-user", (userId) => {
        addNewUser(userId, socket.id);
      });

      socket.on("joinConversation", (conversationId) => {
        const currentRooms = Array.from(socket.rooms); 

        currentRooms.forEach((room) => {
          if (room !== socket.id) {
            socket.leave(room);
          }
        });

        socket.join(conversationId);
      });

      socket.on("message", async (data) => {
        const receiver = await getUser(data.userId);

        if (receiver) {
          this.io.to(receiver.socket_id).emit("send-notification", data);
        }
      });

      socket.on("disconnect", async () => {
        await removeUser(socket.id);
      });
    });
  }
}

const addNewUser = async (userId, socketId) => {
  try {
    const userExist = await getUserSocketId(userId);

    if (userExist) return;

    await addUser(userId, socketId);
  } catch (error) {
    console.log("Error while adding online users", error);
  }
};

const removeUser = async (socketId) => {
  try {
    await removeFromDatabase(socketId);
  } catch (error) {
    console.log("Error while adding online users", error);
  }
};

const getUser = async (userId) => {
  try {
    const resposne = await getUserSocketId(userId);
    return resposne;
  } catch (error) {
    console.log("Error while adding online users", error);
    return null;
  }
};

module.exports = SocketService;
