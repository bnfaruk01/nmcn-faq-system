import { useState } from "react";
import { askChatbot } from "../../services/faqService";
import ChatbotMessage from "./ChatbotMessage";

const suggestions = [
  "How do I renew my licence?",
  "I forgot my password",
  "How can I verify certificates?",
];

export default function ChatbotPanel({ onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello. I am the NMCN support assistant. Ask me a question about licensing, registration, portal access, or verification.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (textToSend = input) => {
    if (!textToSend.trim() || loading) return;

    const question = textToSend.trim();

    setMessages((prev) => [...prev, { sender: "user", text: question }]);
    setInput("");
    setLoading(true);

    try {
      const result = await askChatbot(question);

      if (result.matched) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: result.answer,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text:
              result.message ||
              "Sorry, I could not find an answer to that. You can send it to support for help.",
          },
        ]);
      }
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-panel">
      <div className="chatbot-header">
        <div className="chatbot-header-left">
          <div className="chatbot-ai-badge">AI</div>
          <div>
            <h3>NMCN AI Assistant</h3>
            <p>Instant support and guidance</p>
          </div>
        </div>

        <button className="chatbot-close" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <ChatbotMessage
            key={index}
            sender={message.sender}
            text={message.text}
          />
        ))}

        {loading && (
          <div className="chatbot-message bot">
            Thinking...
          </div>
        )}
      </div>

      <div className="chatbot-suggestions">
        {suggestions.map((item, index) => (
          <button
            key={index}
            className="chatbot-chip"
            onClick={() => sendMessage(item)}
            disabled={loading}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="chatbot-input-wrap">
        <div className="chatbot-input-box">
          <input
            type="text"
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            disabled={loading}
          />
          <button
            className="chatbot-send"
            onClick={() => sendMessage()}
            disabled={loading}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}