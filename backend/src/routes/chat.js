const express = require("express");
const axios = require("axios");
const { userAuth } = require("../middleware/auth");

// ✅ Remove dotenv here — already loaded in app.js
// ✅ Add const keyword
const LLM_URL = process.env.LLM_URL;

const router = express.Router();

router.post("/chatbot/chat", userAuth, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ message: "Message is required" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const userName = req.user.name;

    // ✅ Add timeout so Render cold-start doesn't hang forever
    const response = await axios.post(
      `${LLM_URL}/chatbot/chat`,
      {
        message: message,
        user_name: userName,
      },
      { timeout: 30000 } // 30 seconds
    );

    res.json(response.data);

  } catch (error) {
    console.error("Chat Error:", error.response?.data || error.message);

    // ✅ Better error responses based on error type
    if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
      return res.status(503).json({ message: "Chatbot service is unavailable. Please try again." });
    }
    if (error.code === "ETIMEDOUT" || error.code === "ECONNABORTED") {
      return res.status(504).json({ message: "Chatbot service timed out. It may be starting up — try again in 30 seconds." });
    }

    res.status(500).json({
      message: "Chat service error",
      error: error.response?.data?.detail || error.message,
    });
  }
});

module.exports = router;


// const express = require("express");
// const axios = require("axios");
// const { userAuth } = require("../middleware/auth");
// // const { LLM_URL } = require("../../../frontend/src/utils/constants");

// require("dotenv").config();
// LLM_URL=process.env.LLM_URL

// const router = express.Router();

// router.post("/chatbot/chat", userAuth, async (req, res) => {
//   try {
//     const { message } = req.body;

//     if (!req.user) {
//       return res.status(401).json({ message: "User not authenticated" });
//     }

//     // Extract user name from session
//     const userName = req.user.name;  // User model has 'name' field, not 'firstName'

//     // Call FastAPI
//     const response = await axios.post(LLM_URL+"/chatbot/chat", {
//       message: message,
//       user_name: userName
//     });

//     res.json(response.data);

//   } catch (error) {
//     console.error("Chat Error:", error.response?.data || error.message);
//     res.status(500).json({ message: "Chat service error", error: error.response?.data?.detail });
//   }
// });

// module.exports = router;