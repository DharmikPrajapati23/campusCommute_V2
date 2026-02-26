import { useState, useRef, useEffect } from "react";
import api from "../utils/axiosInstance";
import ReactMarkdown from "react-markdown";


function Chat() {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  const examplePrompts = [
    "Hi What do you do?",
    "What is CampusCommute?",
    "Can I extend my bus pass?",
    "How do I know bus timings?",
    "How do I register for the transport service?",
  ];

  async function generateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;

    const currentQuestion = question;
    setQuestion("");
    setGeneratingAnswer(true);

    setChatHistory((prev) => [
      ...prev,
      { type: "question", content: currentQuestion },
    ]);

    try {
      const response = await api.post(
        "/chatbot/chat",
        {
          message: currentQuestion,
        }
      );

      const aiResponse =
        response.data?.response ||
        "Sorry, I couldn't understand that.";

      setChatHistory((prev) => [
        ...prev,
        { type: "answer", content: aiResponse },
      ]);
    } catch (error) {
      console.error("API error:", error.response?.data || error.message);

      const status = error.response?.status;
      let errMsg = "❌ Server error. Please try again.";

      if (status === 429) {
        errMsg = "⏳ Chatbot is busy. Please wait a moment and try again.";
      } else if (status === 503) {
        errMsg = "🔌 Chatbot service is unavailable. Please try again later.";
      } else if (status === 504) {
        errMsg = "⏱️ Chatbot is starting up. Please try again in 30 seconds.";
      } else if (error.response?.data?.message) {
        errMsg = "❌ " + error.response.data.message;
      }

      setChatHistory((prev) => [
        ...prev,
        { type: "answer", content: errMsg },
      ]);
    }

    // } catch (error) {
    //   console.error("API error:", error.response?.data || error.message);

    //   // ✅ Show specific error message from backend if available
    //   const errMsg =
    //     error.response?.data?.message ||
    //     error.response?.data?.error ||
    //     "❌ Server error. Please try again.";

    //   setChatHistory((prev) => [
    //     ...prev,
    //     { type: "answer", content: errMsg },
    //   ]);
    // }

    // } catch (error) {
    //   console.error("API error:", error.response?.data || error.message);

    //   setChatHistory((prev) => [
    //     ...prev,
    //     { type: "answer", content: "❌ Server error. Please try again." },
    //   ]);
    // }

    setGeneratingAnswer(false);
  }

  return (
    <div className="flex flex-col h-full min-h-[500px]">
      {/* Header */}
      <header className="text-center py-4 bg-blue-100">
        <h1 className="text-4xl font-bold text-blue-600">
          CampusCommute Chatbot
        </h1>
        <p className="text-gray-600">
          Your AI assistant for buses, passes & more
        </p>
      </header>

      {/* Example Prompts */}
      {chatHistory.length === 0 && (
        <div className="text-center mb-4 p-4">
          <h2 className="text-xl font-semibold text-blue-500 mb-2">
            Try asking:
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {examplePrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setQuestion(prompt)}
                className="bg-white border border-blue-200 text-blue-600 px-4 py-2 rounded hover:bg-blue-100 shadow-sm transition"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto mb-4 rounded-lg bg-white shadow-lg p-4 hide-scrollbar"
        style={{ minHeight: 0 }}
      >
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`mb-4 ${chat.type === "question"
              ? "text-right"
              : "text-left"
              }`}
          >
            <div
              className={`inline-block max-w-[80%] p-3 rounded-lg ${chat.type === "question"
                ? "bg-blue-500 text-white rounded-br-none"
                : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
            >
              <ReactMarkdown>{chat.content}</ReactMarkdown>
            </div>
          </div>
        ))}

        {generatingAnswer && (
          <div className="text-left">
            <div className="inline-block bg-gray-100 p-3 rounded-lg animate-pulse">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={generateAnswer}
        className="bg-white rounded-lg shadow-lg p-4"
        style={{ flexShrink: 0 }}
      >
        <div className="flex gap-2">
          <textarea
            required
            className="flex-1 border border-gray-300 rounded p-3 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 resize-none"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything..."
            rows="2"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                generateAnswer(e);
              }
            }}
          />
          <button
            type="submit"
            className={`px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors ${generatingAnswer
              ? "opacity-50 cursor-not-allowed"
              : ""
              }`}
            disabled={generatingAnswer}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chat;