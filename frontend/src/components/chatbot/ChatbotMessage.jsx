export default function ChatbotMessage({ sender, text }) {
  const lines = String(text || "").split("\n");

  return (
    <div className={`chatbot-message ${sender}`}>
      {lines.map((line, index) => (
        <p key={index} className="chatbot-message-line">
          {line}
        </p>
      ))}
    </div>
  );
}