import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import FAQForm from "../../components/admin/FAQForm";
import { fetchFaqById, updateFaq } from "../../services/faqService";

export default function EditFAQPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [faq, setFaq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFaq = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchFaqById(id);

        if (!data) {
          setError("FAQ not found.");
          return;
        }

        setFaq({
          ...data,
          relatedLinkLabel: data.related_link_label || "",
          relatedLinkUrl: data.related_link_url || "",
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load FAQ.");
      } finally {
        setLoading(false);
      }
    };

    loadFaq();
  }, [id]);

  const handleUpdateFaq = async (formData) => {
    try {
      await updateFaq(id, formData);
      navigate("/admin/faqs");
    } catch (err) {
      console.error(err);
      alert("Failed to update FAQ.");
    }
  };

  return (
    <AdminLayout
      title="Edit FAQ"
      subtitle="Update an existing FAQ entry."
    >
      {loading ? (
        <div className="admin-panel">
          <p>Loading FAQ...</p>
        </div>
      ) : error ? (
        <div className="admin-panel">
          <p>{error}</p>
        </div>
      ) : (
        <FAQForm initialData={faq} onSubmit={handleUpdateFaq} />
      )}
    </AdminLayout>
  );
}