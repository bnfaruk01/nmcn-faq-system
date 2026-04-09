import AdminLayout from "../../layouts/AdminLayout";

export default function FAQManagementPage() {
  return (
    <AdminLayout
      title="FAQ Management"
      subtitle="Create, edit, publish, and organize public FAQ content."
    >
      <div className="admin-panel">
        <h2>FAQ Management Page</h2>
        <p>This is where the FAQ table, filters, and actions will go.</p>
      </div>
    </AdminLayout>
  );
}