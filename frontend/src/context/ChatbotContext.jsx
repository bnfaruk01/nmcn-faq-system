import { createContext, useContext, useState } from "react";

const ChatbotContext = createContext();

export function ChatbotProvider({ children }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChatbot = () => setIsChatOpen(true);
  const closeChatbot = () => setIsChatOpen(false);
  const toggleChatbot = () => setIsChatOpen((prev) => !prev);

  return (
    <ChatbotContext.Provider
      value={{
        isChatOpen,
        openChatbot,
        closeChatbot,
        toggleChatbot,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbot() {
  return useContext(ChatbotContext);
}