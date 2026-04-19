import { useState } from "react";
import "../../assets/styles/chatbot.css";
import ChatbotPanel from "./ChatbotPanel";

export default function ChatbotLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <div className="chatbot-root">
      {open && <ChatbotPanel onClose={() => setOpen(false)} />}

      <button
        className="chatbot-launcher"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open chatbot"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 18H7L3 21V6C3 4.89543 3.89543 4 5 4H15C16.1046 4 17 4.89543 17 6V8"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 17C10 15.8954 10.8954 15 12 15H19C20.1046 15 21 15.8954 21 17V20L18.5 18H12C10.8954 18 10 17.1046 10 16V17Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
}