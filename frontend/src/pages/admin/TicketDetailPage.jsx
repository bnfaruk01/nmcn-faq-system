import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import {
  fetchTicketById,
  replyToTicket,
  convertTicketToFaq,
} from "../../services/faqService";

export default function TicketDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("Resolved");
  const [loading, setLoading] = useState(true);

  const [faqCategory, setFaqCategory] = useState("Support");
  const [faqStatus, setFaqStatus] = useState("Draft");
  const [faqFeatured, setFaqFeatured] = useState(false);
  const [faqKeywords, setFaqKeywords] = useState("");
  const [faqLinkLabel, setFaqLinkLabel] = useState("");
  const [faqLinkUrl, setFaqLinkUrl] = useState("");

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

  const handleReplySubmit = async (e) => {
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

  const handleConvertToFaq = async () => {
    if (!reply.trim()) {
      alert("Please write an admin reply first before converting.");
      return;
    }

    try {
      await convertTicketToFaq(id, {
        category: faqCategory,
        status: faqStatus,
        featured: faqFeatured,
        keywords: faqKeywords,
        related_link_label: faqLinkLabel,
        related_link_url: faqLinkUrl,
      });

      alert("Ticket converted to FAQ successfully.");
      navigate("/admin/faqs");
    } catch (error) {
      console.error(error);
      alert("Failed to convert ticket to FAQ.");
    }
  };

  return (
    <AdminLayout
      title="Ticket Detail"
      subtitle="Review the question, reply, and convert useful answers into FAQs."
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
        <>
          <div className="admin-panel">
            <h2>User Question</h2>
            <p>{ticket.user_question}</p>

            <form className="admin-form-grid" onSubmit={handleReplySubmit}>
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

          <div className="admin-panel">
            <h2>Convert This Ticket to FAQ</h2>

            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label>Category</label>
                <select value={faqCategory} onChange={(e) => setFaqCategory(e.target.value)}>
                  <option>Licensing</option>
                  <option>Registration</option>
                  <option>Portal Access</option>
                  <option>Verification</option>
                  <option>Support</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label>Status</label>
                <select value={faqStatus} onChange={(e) => setFaqStatus(e.target.value)}>
                  <option>Published</option>
                  <option>Draft</option>
                </select>
              </div>

              <div className="admin-form-group full">
                <label>Keywords</label>
                <input
                  type="text"
                  value={faqKeywords}
                  onChange={(e) => setFaqKeywords(e.target.value)}
                  placeholder="Example: renewal, licence, support"
                />
              </div>

              <div className="admin-form-group">
                <label>Related Link Label</label>
                <input
                  type="text"
                  value={faqLinkLabel}
                  onChange={(e) => setFaqLinkLabel(e.target.value)}
                  placeholder="Example: Open Licence Portal"
                />
              </div>

              <div className="admin-form-group">
                <label>Related Link URL</label>
                <input
                  type="text"
                  value={faqLinkUrl}
                  onChange={(e) => setFaqLinkUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div className="admin-form-group checkbox-group full">
                <label className="checkbox-inline">
                  <input
                    type="checkbox"
                    checked={faqFeatured}
                    onChange={(e) => setFaqFeatured(e.target.checked)}
                  />
                  <span>Mark as Featured FAQ</span>
                </label>
              </div>

              <div className="admin-form-actions full">
                <button
                  type="button"
                  className="admin-primary-btn"
                  onClick={handleConvertToFaq}
                >
                  Convert to FAQ
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}