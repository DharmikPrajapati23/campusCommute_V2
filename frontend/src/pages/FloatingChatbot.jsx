import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { BASE_URL } from "../utils/constants";
import chatbotIcon from "../image/image.png";

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  async function handleSendMessage(e) {
    e.preventDefault();
    const trimmed = inputMessage.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { type: "user", content: trimmed }]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/chatbot/chat`,
        { message: trimmed },
        { withCredentials: true }
      );

      const aiResponse = response.data?.response || "Sorry, I couldn't understand that.";

      setMessages((prev) => [...prev, { type: "bot", content: aiResponse }]);
    } catch (error) {
      console.error("API error:", error.response?.data || error.message);

      const errorMsg =
        error.response?.status === 429
          ? "⚠️ Server busy. Please try again."
          : "❌ Server error. Please try again later.";

      setMessages((prev) => [...prev, { type: "bot", content: errorMsg }]);
    } finally {
      setIsTyping(false);
    }
  }

  // Allow Enter to send, Shift+Enter for newline (consistent with Chat.jsx)
  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 shadow-2xl flex items-center justify-center z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle chatbot"
      >
        {isOpen ? (
          <X size={30} className="text-white" />
        ) : (
          <div className="bg-white rounded-full p-3 shadow-md flex items-center justify-center">
            <img src={chatbotIcon} alt="chatbot" className="w-10 h-10 object-contain" />
          </div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-[370px] h-[520px] bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-40"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">Pakkun Chatbot</h3>
                <p className="text-xs opacity-80">CampusCommute AI Support</p>
              </div>
              <button onClick={() => setIsOpen(false)} aria-label="Close chat">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 mt-6">
                  👋 Hi! I'm Pakkun.<br />
                  Ask me anything about CampusCommute.
                </div>
              )}

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow ${
                      msg.type === "user"
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-white text-gray-800 rounded-bl-sm"
                    }`}
                  >
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white px-4 py-2 rounded-2xl shadow text-gray-500 text-sm animate-pulse">
                    Thinking...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask something..."
                className="flex-1 px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChatbot;