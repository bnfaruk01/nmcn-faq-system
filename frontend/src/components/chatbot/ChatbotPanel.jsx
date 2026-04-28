import { useEffect, useRef, useState } from "react";
import { askChatbot } from "../../services/faqService";
import ChatbotMessage from "./ChatbotMessage";

const defaultSuggestions = [
  "How do I renew my licence?",
  "I forgot my password",
  "How can I verify certificates?",
  "How do I contact support?",
];

export default function ChatbotPanel({ onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello. Welcome to NMCN Support.\n\nI can help with licence renewal, registration, portal access, verification, and support questions.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(defaultSuggestions);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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

        setSuggestions([
          "Tell me about registration",
          "How do I reset my password?",
          "How do I contact support?",
        ]);
      } else {
        const fallbackText = result.follow_up
          ? `${result.message}\n\n${result.follow_up}`
          : result.message ||
            "I could not find a clear answer for that right now.";

        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: fallbackText,
          },
        ]);

        setSuggestions([
          "How do I renew my licence?",
          "How do I contact support?",
          "Tell me about portal access",
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
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  return (
    <div className="chatbot-panel">
      <div className="chatbot-header">
        <div className="chatbot-header-left">
          <div className="chatbot-ai-badge">AI</div>
          <div>
            <h3>NMCN Support</h3>
            <p>Ask a question and get help fast</p>
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
          <div className="chatbot-message bot chatbot-typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}

        <div ref={messagesEndRef}></div>
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
            ref={inputRef}
            type="text"
            placeholder="Type your question here..."
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