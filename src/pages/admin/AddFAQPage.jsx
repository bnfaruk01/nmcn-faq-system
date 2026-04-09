import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import FAQForm from "../../components/admin/FAQForm";
import { useFAQAdmin } from "../../context/FAQAdminContext";

export default function AddFAQPage() {
  const { addFaq } = useFAQAdmin();
  const navigate = useNavigate();

  const handleAddFaq = (formData) => {
    addFaq(formData);
    navigate("/admin/faqs");
  };

  return (
    <AdminLayout
      title="Add New FAQ"
      subtitle="Create a new question and answer for the public FAQ page."
    >
      <FAQForm onSubmit={handleAddFaq} />
    </AdminLayout>
  );
}