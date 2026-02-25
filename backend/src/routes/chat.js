const express = require("express");
const axios = require("axios");
const { userAuth } = require("../middleware/auth");
// const { LLM_URL } = require("../../../frontend/src/utils/constants");

require("dotenv").config();
LLM_URL=process.env.LLM_URL

const router = express.Router();

router.post("/chatbot/chat", userAuth, async (req, res) => {
  try {
    const { message } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Extract user name from session
    const userName = req.user.name;  // User model has 'name' field, not 'firstName'

    // Call FastAPI
    const response = await axios.post(LLM_URL+"/chatbot/chat", {
      message: message,
      user_name: userName
    });

    res.json(response.data);

  } catch (error) {
    console.error("Chat Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Chat service error", error: error.response?.data?.detail });
  }
});

module.exports = router;