import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { fetchTicketById, replyToTicket } from "../../services/faqService";

export default function TicketDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("Resolved");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTicket = async () => {
      try {
        const data = await fetchTicketById(id);
        setTicket(data);
        setReply(data.admin_reply || "");
        setStatus(data.status || "Open");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadTicket();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await replyToTicket(id, {
        admin_reply: reply,
        status,
      });

      alert("Ticket updated successfully.");
      navigate("/admin/tickets");
    } catch (error) {
      console.error(error);
      alert("Failed to update ticket.");
    }
  };

  return (
    <AdminLayout
      title="Ticket Detail"
      subtitle="Review the question and provide an admin response."
    >
      {loading ? (
        <div className="admin-panel">
          <p>Loading ticket...</p>
        </div>
      ) : !ticket ? (
        <div className="admin-panel">
          <p>Ticket not found.</p>
        </div>
      ) : (
        <div className="admin-panel">
          <h2>User Question</h2>
          <p>{ticket.user_question}</p>

          <form className="admin-form-grid" onSubmit={handleSubmit}>
            <div className="admin-form-group full">
              <label>Admin Reply</label>
              <textarea
                rows="6"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type your response here..."
              />
            </div>

            <div className="admin-form-group">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </div>

            <div className="admin-form-actions full">
              <button type="submit" className="admin-primary-btn">
                Save Reply
              </button>
            </div>
          </form>
        </div>
      )}
    </AdminLayout>
  );
}