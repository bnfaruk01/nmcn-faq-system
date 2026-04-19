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
        AI
      </button>
    </div>
  );
}