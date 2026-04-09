import AdminLayout from "../../layouts/AdminLayout";
import FAQForm from "../../components/admin/FAQForm";

export default function AddFAQPage() {
  return (
    <AdminLayout
      title="Add New FAQ"
      subtitle="Create a new question and answer for the public FAQ page."
    >
      <FAQForm />
    </AdminLayout>
  );
}