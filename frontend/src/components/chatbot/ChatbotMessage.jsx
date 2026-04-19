export default function ChatbotMessage({ sender, text }) {
  return <div className={`chatbot-message ${sender}`}>{text}</div>;
}