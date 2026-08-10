const express = require("express");

const {
  getMessages,
  createMessages,
} = require("../controllers/messageController");

const router = express.Router();

router.get("/", getMessages);
router.post("/", createMessages);

module.exports = router;
