import AdminLayout from "../../layouts/AdminLayout";

export default function AnalyticsPage() {
  return (
    <AdminLayout
      title="Analytics"
      subtitle="Monitor search trends, FAQ performance, and support activity."
    >
      <div className="admin-panel">
        <h2>Analytics</h2>
        <p>This is where trends and performance insights will appear.</p>
      </div>
    </AdminLayout>
  );
}