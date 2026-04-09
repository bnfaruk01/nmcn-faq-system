import { Link } from "react-router-dom";

export default function FAQTable({ faqs, onDelete }) {
  return (
    <div className="admin-panel">
      <h2>All FAQs</h2>

      <div className="admin-table-wrapper">
        <table className="admin-faq-table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Category</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {faqs.length > 0 ? (
              faqs.map((faq) => (
                <tr key={faq.id}>
                  <td>{faq.question}</td>
                  <td>{faq.category}</td>
                  <td>
                    <span
                      className={`admin-pill ${
                        faq.status === "Published" ? "published" : "draft"
                      }`}
                    >
                      {faq.status}
                    </span>
                  </td>
                  <td>{faq.featured ? "Yes" : "No"}</td>
                  <td>{faq.updatedAt}</td>
                  <td>
                    <div className="admin-action-group">
                      <Link
                        to={`/admin/faqs/${faq.id}/edit`}
                        className="admin-action-btn edit admin-link-btn"
                      >
                        Edit
                      </Link>

                      <button
                        className="admin-action-btn delete"
                        onClick={() => onDelete(faq.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No FAQs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}