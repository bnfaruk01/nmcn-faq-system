import { useState } from "react";
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
      text: "Hello. I’m the NMCN AI support assistant. Ask me a question about licensing, registration, portal access, or verification.",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = (textToSend = input) => {
    if (!textToSend.trim()) return;

    const userMessage = { sender: "user", text: textToSend };
    const botReply = {
      sender: "bot",
      text: "I’ve received your question. In the next step, we’ll connect this panel to the FAQ database and admin escalation flow.",
    };

    setMessages((prev) => [...prev, userMessage, botReply]);
    setInput("");
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
      </div>

      <div className="chatbot-suggestions">
        {suggestions.map((item, index) => (
          <button
            key={index}
            className="chatbot-chip"
            onClick={() => sendMessage(item)}
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
          />
          <button className="chatbot-send" onClick={() => sendMessage()}>
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}