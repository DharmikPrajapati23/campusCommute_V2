const express = require("express");
const axios = require("axios");
const { userAuth } = require("../middleware/auth");

const LLM_URL = process.env.LLM_URL;

const router = express.Router();

router.post("/chatbot/chat", userAuth, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ message: "Message is required" });
    }

    const userName = req.user.name;

    const response = await axios.post(
      `${LLM_URL}/chatbot/chat`,
      { message, user_name: userName },
      {
        timeout: 180000,
        headers: {
          "Content-Type": "application/json",
          // ✅ These headers tell Cloudflare this is a legitimate API-to-API call
          "Accept": "application/json",
          "User-Agent": "CampusCommute-Node-Backend/1.0",
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );

    res.json(response.data);

  } catch (error) {
    const status = error.response?.status;
    console.error("Chat Error:", error.response?.data || error.message);

    if (status === 429) {
      return res.status(429).json({ message: "Chatbot is busy. Please try again in a moment." });
    }
    if (error.code === "ETIMEDOUT" || error.code === "ECONNABORTED") {
      return res.status(504).json({ message: "Chatbot is starting up. Try again in 30 seconds." });
    }
    res.status(500).json({ message: "Chat service error" });
  }
});

// ✅ Health check proxy — Node pings FastAPI /health
router.get("/chatbot/health", async (req, res) => {
  try {
    await axios.get(`${LLM_URL}/health`, { timeout: 180000 });
    res.status(200).json({ status: "ok" });
  } catch (err) {
    // Return 200 anyway so frontend doesn't show error — LLM might still wake up
    res.status(200).json({ status: "starting" });
  }
});


module.exports = router;


// const express = require("express");
// const axios = require("axios");
// const { userAuth } = require("../middleware/auth");

// const LLM_URL = process.env.LLM_URL;
// const router = express.Router();

// // Retry helper with exponential backoff
// const callLLMWithRetry = async (url, body, retries = 3) => {
//   for (let attempt = 1; attempt <= retries; attempt++) {
//     try {
//       const response = await axios.post(url, body, {
//         timeout: 60000,
//         headers: {
//           "Content-Type": "application/json",
//           "User-Agent": "CampusCommute-Backend/1.0", // helps bypass bot detection
//         },
//       });
//       return response;
//     } catch (err) {
//       const status = err.response?.status;

//       // Don't retry on these
//       if (status === 400 || status === 401 || status === 403 || status === 404) {
//         throw err;
//       }

//       // Retry on 429 (rate limit) or 5xx (server errors)
//       if (attempt < retries && (status === 429 || status >= 500)) {
//         const delay = attempt * 2000; // 2s, 4s, 6s
//         console.log(`Attempt ${attempt} failed (${status}). Retrying in ${delay}ms...`);
//         await new Promise((resolve) => setTimeout(resolve, delay));
//         continue;
//       }

//       throw err;
//     }
//   }
// };

// router.post("/chatbot/chat", userAuth, async (req, res) => {
//   try {
//     const { message } = req.body;

//     if (!message || !message.trim()) {
//       return res.status(400).json({ message: "Message is required" });
//     }

//     if (!LLM_URL) {
//       console.error("LLM_URL is not set in environment variables");
//       return res.status(503).json({ message: "Chatbot service is not configured" });
//     }

//     const userName = req.user.name;

//     const response = await callLLMWithRetry(`${LLM_URL}/chatbot/chat`, {
//       message,
//       user_name: userName,
//     });

//     res.json(response.data);

//   } catch (error) {
//     console.error("Chat Error:", error.response?.data || error.message);

//     const status = error.response?.status;

//     if (status === 429) {
//       return res.status(429).json({
//         message: "Chatbot is busy right now. Please wait a moment and try again.",
//       });
//     }
//     if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
//       return res.status(503).json({
//         message: "Chatbot service is unavailable. Please try again later.",
//       });
//     }
//     if (error.code === "ETIMEDOUT" || error.code === "ECONNABORTED") {
//       return res.status(504).json({
//         message: "Chatbot is starting up. Please try again in 30 seconds.",
//       });
//     }

//     res.status(500).json({
//       message: "Chat service error",
//       error: error.response?.data?.detail || error.message,
//     });
//   }
// });

// module.exports = router;


// // const express = require("express");
// // const axios = require("axios");
// // const { userAuth } = require("../middleware/auth");

// // // ✅ Remove dotenv here — already loaded in app.js
// // // ✅ Add const keyword
// // const LLM_URL = process.env.LLM_URL;

// // const router = express.Router();

// // router.post("/chatbot/chat", userAuth, async (req, res) => {
// //   try {
// //     const { message } = req.body;

// //     if (!message || !message.trim()) {
// //       return res.status(400).json({ message: "Message is required" });
// //     }

// //     if (!req.user) {
// //       return res.status(401).json({ message: "User not authenticated" });
// //     }

// //     const userName = req.user.name;

// //     // ✅ Add timeout so Render cold-start doesn't hang forever
// //     const response = await axios.post(
// //       `${LLM_URL}/chatbot/chat`,
// //       {
// //         message: message,
// //         user_name: userName,
// //       },
// //       { timeout: 30000 } // 30 seconds
// //     );

// //     res.json(response.data);

// //   } catch (error) {
// //     console.error("Chat Error:", error.response?.data || error.message);

// //     // ✅ Better error responses based on error type
// //     if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
// //       return res.status(503).json({ message: "Chatbot service is unavailable. Please try again." });
// //     }
// //     if (error.code === "ETIMEDOUT" || error.code === "ECONNABORTED") {
// //       return res.status(504).json({ message: "Chatbot service timed out. It may be starting up — try again in 30 seconds." });
// //     }

// //     res.status(500).json({
// //       message: "Chat service error",
// //       error: error.response?.data?.detail || error.message,
// //     });
// //   }
// // });

// // module.exports = router;


// // // const express = require("express");
// // // const axios = require("axios");
// // // const { userAuth } = require("../middleware/auth");
// // // // const { LLM_URL } = require("../../../frontend/src/utils/constants");

// // // require("dotenv").config();
// // // LLM_URL=process.env.LLM_URL

// // // const router = express.Router();

// // // router.post("/chatbot/chat", userAuth, async (req, res) => {
// // //   try {
// // //     const { message } = req.body;

// // //     if (!req.user) {
// // //       return res.status(401).json({ message: "User not authenticated" });
// // //     }

// // //     // Extract user name from session
// // //     const userName = req.user.name;  // User model has 'name' field, not 'firstName'

// // //     // Call FastAPI
// // //     const response = await axios.post(LLM_URL+"/chatbot/chat", {
// // //       message: message,
// // //       user_name: userName
// // //     });

// // //     res.json(response.data);

// // //   } catch (error) {
// // //     console.error("Chat Error:", error.response?.data || error.message);
// // //     res.status(500).json({ message: "Chat service error", error: error.response?.data?.detail });
// // //   }
// // // });

// // // module.exports = router;