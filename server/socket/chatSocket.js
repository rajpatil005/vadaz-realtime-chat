const Message = require("../models/Message");

const connectedUsers = new Map();

const setupChatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_chat", (username) => {
      if (!username) return;

      connectedUsers.set(socket.id, username);

      io.emit("online_users", Array.from(connectedUsers.values()));

      console.log(`${username} joined the chat`);
    });

    socket.on("send_message", async (data) => {
      try {
        const { username, text } = data;

        if (!username || !text?.trim()) {
          return;
        }

        const message = await Message.create({
          username,
          text: text.trim(),
        });

        io.emit("receive_message", message);
      } catch (error) {
        console.error("Socket message error:", error.message);

        socket.emit("message_error", {
          message: "Failed to send message",
        });
      }
    });

    socket.on("typing", (username) => {
      socket.broadcast.emit("user_typing", username);
    });

    socket.on("stop_typing", () => {
      socket.broadcast.emit("user_stop_typing");
    });

    socket.on("disconnect", () => {
      const username = connectedUsers.get(socket.id);

      connectedUsers.delete(socket.id);

      io.emit("online_users", Array.from(connectedUsers.values()));

      console.log(
        username
          ? `${username} disconnected`
          : `User disconnected: ${socket.id}`,
      );
    });
  });
};

module.exports = setupChatSocket;
