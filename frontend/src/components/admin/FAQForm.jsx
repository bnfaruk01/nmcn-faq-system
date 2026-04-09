import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FAQForm({ initialData = null, onSubmit }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    question: initialData?.question || "",
    answer: initialData?.answer || "",
    category: initialData?.category || "Licensing",
    status: initialData?.status || "Draft",
    keywords: initialData?.keywords || "",
    relatedLinkLabel: initialData?.relatedLinkLabel || "",
    relatedLinkUrl: initialData?.relatedLinkUrl || "",
    featured: initialData?.featured || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.question.trim() || !formData.answer.trim()) {
      alert("Question and Answer are required.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="admin-panel">
      <h2>FAQ Details</h2>

      <form className="admin-form-grid" onSubmit={handleSubmit}>
        <div className="admin-form-group full">
          <label>Question</label>
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
            placeholder="Enter the frequently asked question"
          />
        </div>

        <div className="admin-form-group full">
          <label>Answer</label>
          <textarea
            rows="6"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            placeholder="Enter the full answer that will appear on the public FAQ page"
          ></textarea>
        </div>

        <div className="admin-form-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option>Licensing</option>
            <option>Registration</option>
            <option>Portal Access</option>
            <option>Verification</option>
            <option>Support</option>
          </select>
        </div>

        <div className="admin-form-group">
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Published</option>
            <option>Draft</option>
          </select>
        </div>

        <div className="admin-form-group full">
          <label>Keywords</label>
          <input
            type="text"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
            placeholder="Example: renewal, licence, penalty, portal"
          />
        </div>

        <div className="admin-form-group">
          <label>Related Link Label</label>
          <input
            type="text"
            name="relatedLinkLabel"
            value={formData.relatedLinkLabel}
            onChange={handleChange}
            placeholder="Example: Open Licence Portal"
          />
        </div>

        <div className="admin-form-group">
          <label>Related Link URL</label>
          <input
            type="text"
            name="relatedLinkUrl"
            value={formData.relatedLinkUrl}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div className="admin-form-group checkbox-group full">
          <label className="checkbox-inline">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />
            <span>Mark as Featured FAQ</span>
          </label>
        </div>

        <div className="admin-form-actions full">
          <button type="submit" className="admin-primary-btn">
            Save FAQ
          </button>

          <button
            type="button"
            className="admin-secondary-btn"
            onClick={() => navigate("/admin/faqs")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}