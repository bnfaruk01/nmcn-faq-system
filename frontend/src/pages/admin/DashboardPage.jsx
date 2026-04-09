import AdminLayout from "../../layouts/AdminLayout";
import AdminStatCard from "../../components/admin/AdminStatCard";

export default function DashboardPage() {
  return (
    <AdminLayout
      title="Dashboard Overview"
      subtitle="Monitor FAQs, chatbot escalations, support tickets, and performance."
    >
      <div className="admin-stats-grid">
        <AdminStatCard title="Total FAQs" value="48" meta="12 published this month" />
        <AdminStatCard title="Unanswered Questions" value="17" meta="Needs review" />
        <AdminStatCard title="Open Tickets" value="9" meta="3 high priority" />
        <AdminStatCard title="Chatbot Success Rate" value="82%" meta="Improving steadily" />
      </div>

      <div className="admin-panels-grid">
        <div className="admin-panel">
          <h2>Recent Unanswered Questions</h2>

          <div className="admin-list">
            <div className="admin-list-item">
              <div>
                <strong>How do I correct a mismatch in my licence details?</strong>
                <span>Submitted 25 mins ago</span>
              </div>
              <div className="admin-status pending">Pending</div>
            </div>

            <div className="admin-list-item">
              <div>
                <strong>Can I renew from outside Nigeria?</strong>
                <span>Submitted 1 hour ago</span>
              </div>
              <div className="admin-status review">Review</div>
            </div>

            <div className="admin-list-item">
              <div>
                <strong>Where can I request good standing for overseas use?</strong>
                <span>Submitted today</span>
              </div>
              <div className="admin-status resolved">Resolved</div>
            </div>
          </div>
        </div>

        <div className="admin-panel">
          <h2>Top Search Trends</h2>

          <div className="admin-list">
            <div className="admin-list-item">
              <div>
                <strong>Licence renewal</strong>
                <span>Most searched this week</span>
              </div>
            </div>

            <div className="admin-list-item">
              <div>
                <strong>Password reset</strong>
                <span>Frequent portal issue</span>
              </div>
            </div>

            <div className="admin-list-item">
              <div>
                <strong>Certificate verification</strong>
                <span>High public demand</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-panel">
        <h2>FAQ Management Preview</h2>

        <table className="admin-table-placeholder">
          <thead>
            <tr>
              <th>Question</th>
              <th>Category</th>
              <th>Status</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>How do I renew my licence?</td>
              <td>Licensing</td>
              <td>Published</td>
              <td>Today</td>
            </tr>
            <tr>
              <td>I forgot my password. What should I do?</td>
              <td>Portal Access</td>
              <td>Published</td>
              <td>Yesterday</td>
            </tr>
            <tr>
              <td>How can I verify certificates?</td>
              <td>Verification</td>
              <td>Draft</td>
              <td>2 days ago</td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}