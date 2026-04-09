import AdminLayout from "../../layouts/AdminLayout";

export default function CategoryPage() {
  return (
    <AdminLayout
      title="Category Management"
      subtitle="Manage FAQ categories used on the public page and in admin."
    >
      <div className="admin-panel">
        <h2>Categories</h2>
        <p>This is where category management tools will go.</p>
      </div>
    </AdminLayout>
  );
}