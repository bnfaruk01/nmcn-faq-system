import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import FAQTable from "../../components/admin/FAQTable";
import { fetchAllFaqs, deleteFaq as deleteFaqRequest } from "../../services/faqService";

export default function FAQManagementPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const loadFaqs = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchAllFaqs();
      setFaqs(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load FAQs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch = faq.question
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || faq.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" || faq.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [faqs, searchTerm, categoryFilter, statusFilter]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this FAQ?");
    if (!confirmed) return;

    try {
      await deleteFaqRequest(id);
      await loadFaqs();
    } catch (err) {
      console.error(err);
      alert("Failed to delete FAQ.");
    }
  };

  return (
    <AdminLayout
      title="FAQ Management"
      subtitle="Create, edit, publish, and organize public FAQ content."
    >
      <div className="admin-panel">
        <div className="admin-toolbar">
          <div className="admin-toolbar-left">
            <input
              type="text"
              className="admin-search-input"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="admin-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option>All</option>
              <option>Licensing</option>
              <option>Registration</option>
              <option>Portal Access</option>
              <option>Verification</option>
              <option>Support</option>
            </select>

            <select
              className="admin-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
          </div>

          <div className="admin-toolbar-right">
            <Link to="/admin/faqs/new" className="admin-primary-btn">
              Add New FAQ
            </Link>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="admin-panel">
          <p>Loading FAQs...</p>
        </div>
      ) : error ? (
        <div className="admin-panel">
          <p>{error}</p>
        </div>
      ) : (
        <FAQTable faqs={filteredFaqs} onDelete={handleDelete} />
      )}
    </AdminLayout>
  );
}