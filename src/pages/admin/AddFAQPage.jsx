import AdminLayout from "../../layouts/AdminLayout";

export default function AddFAQPage() {
  return (
    <AdminLayout
      title="Add New FAQ"
      subtitle="Create a new question and answer for the public FAQ page."
    >
      <div className="admin-panel">
        <h2>Add FAQ Form</h2>
        <p>This is where the admin form for creating a new FAQ will go.</p>
      </div>
    </AdminLayout>
  );
}