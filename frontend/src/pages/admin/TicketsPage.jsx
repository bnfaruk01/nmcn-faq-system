import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { fetchAllTickets } from "../../services/faqService";

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTickets = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchAllTickets();
        setTickets(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load tickets.");
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, []);

  return (
    <AdminLayout
      title="Support Tickets"
      subtitle="Track escalated chatbot issues and provide human support."
    >
      {loading ? (
        <div className="admin-panel">
          <p>Loading tickets...</p>
        </div>
      ) : error ? (
        <div className="admin-panel">
          <p>{error}</p>
        </div>
      ) : (
        <div className="admin-panel">
          <h2>Escalated Questions</h2>

          <table className="admin-faq-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User Question</th>
                <th>Status</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>{ticket.id}</td>
                    <td>{ticket.user_question}</td>
                    <td>{ticket.status}</td>
                    <td>{new Date(ticket.created_at).toLocaleString()}</td>
                    <td>
                      <Link
                        to={`/admin/tickets/${ticket.id}`}
                        className="admin-action-btn edit admin-link-btn"
                      >
                        Open
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No support tickets found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}