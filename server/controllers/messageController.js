const Message = require("../models/Message");

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 }).limit(100);

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    res.status(500).json({
      message: "Failed to fetch messages",
    });
  }
};

const createMessages = async (req, res) => {
  try {
    const { username, text } = req.body;

    if (!username || !text) {
      res.status(400).json({
        message: "Username and message are required",
      });
    }

    const message = await Message.create({
      username,
      text,
    });

    res.status(200).json(message);
  } catch (error) {
    console.error("Error creating message:", error.message);
    res.status(500).json({
      message: "Failed to create message",
    });
  }
};

module.exports = {
  getMessages,
  createMessages,
};
