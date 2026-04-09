import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import FAQTable from "../../components/admin/FAQTable";
import { useFAQAdmin } from "../../context/FAQAdminContext";

export default function FAQManagementPage() {
  const { faqs, deleteFaq } = useFAQAdmin();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

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

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this FAQ?");
    if (confirmed) {
      deleteFaq(id);
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

      <FAQTable faqs={filteredFaqs} onDelete={handleDelete} />
    </AdminLayout>
  );
}