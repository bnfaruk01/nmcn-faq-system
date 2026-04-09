import AdminLayout from "../../layouts/AdminLayout";

export default function SettingsPage() {
  return (
    <AdminLayout
      title="Settings"
      subtitle="Configure support behavior, admin preferences, and system options."
    >
      <div className="admin-panel">
        <h2>Settings</h2>
        <p>This is where admin settings and configurations will go.</p>
      </div>
    </AdminLayout>
  );
}