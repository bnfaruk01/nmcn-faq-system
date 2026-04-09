import AdminLayout from "../../layouts/AdminLayout";

export default function ChatbotLogsPage() {
  return (
    <AdminLayout
      title="Chatbot Logs"
      subtitle="Review unanswered questions, confidence levels, and escalation behavior."
    >
      <div className="admin-panel">
        <h2>Chatbot Logs</h2>
        <p>This is where chatbot interactions and unresolved questions will appear.</p>
      </div>
    </AdminLayout>
  );
}