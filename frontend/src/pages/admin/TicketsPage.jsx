import AdminLayout from "../../layouts/AdminLayout";

export default function TicketsPage() {
  return (
    <AdminLayout
      title="Support Tickets"
      subtitle="Track escalated issues and provide human support responses."
    >
      <div className="admin-panel">
        <h2>Tickets</h2>
        <p>This is where escalated support tickets will be listed.</p>
      </div>
    </AdminLayout>
  );
}