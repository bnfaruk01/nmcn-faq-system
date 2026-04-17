import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import FAQForm from "../../components/admin/FAQForm";
import { createFaq } from "../../services/faqService";

export default function AddFAQPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAddFaq = async (formData) => {
    try {
      setLoading(true);
      await createFaq(formData);
      navigate("/admin/faqs");
    } catch (err) {
      console.error(err);
      alert("Failed to create FAQ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout
      title="Add New FAQ"
      subtitle="Create a new question and answer for the public FAQ page."
    >
      <FAQForm onSubmit={handleAddFaq} loading={loading} />
    </AdminLayout>
  );
}