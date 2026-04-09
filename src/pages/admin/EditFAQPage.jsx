import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import FAQForm from "../../components/admin/FAQForm";
import { useFAQAdmin } from "../../context/FAQAdminContext";

export default function EditFAQPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getFaqById, updateFaq } = useFAQAdmin();

  const faq = getFaqById(id);

  if (!faq) {
    return (
      <AdminLayout
        title="Edit FAQ"
        subtitle="Update an existing FAQ entry."
      >
        <div className="admin-panel">
          <h2>FAQ not found</h2>
        </div>
      </AdminLayout>
    );
  }

  const handleUpdateFaq = (formData) => {
    updateFaq(id, formData);
    navigate("/admin/faqs");
  };

  return (
    <AdminLayout
      title="Edit FAQ"
      subtitle="Update an existing FAQ entry."
    >
      <FAQForm initialData={faq} onSubmit={handleUpdateFaq} />
    </AdminLayout>
  );
}