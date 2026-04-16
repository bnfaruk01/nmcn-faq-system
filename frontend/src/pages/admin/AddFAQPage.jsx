import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import FAQForm from "../../components/admin/FAQForm";
import { createFaq } from "../../services/faqService";

export default function AddFAQPage() {
  const navigate = useNavigate();

  const handleAddFaq = async (formData) => {
    try {
      await createFaq(formData);
      navigate("/admin/faqs");
    } catch (err) {
      console.error(err);
      alert("Failed to create FAQ.");
    }
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