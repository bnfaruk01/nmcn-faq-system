export default function FAQForm() {
  return (
    <div className="admin-panel">
      <h2>FAQ Details</h2>

      <form className="admin-form-grid">
        <div className="admin-form-group full">
          <label>Question</label>
          <input
            type="text"
            placeholder="Enter the frequently asked question"
          />
        </div>

        <div className="admin-form-group full">
          <label>Answer</label>
          <textarea
            rows="6"
            placeholder="Enter the full answer that will appear on the public FAQ page"
          ></textarea>
        </div>

        <div className="admin-form-group">
          <label>Category</label>
          <select>
            <option>Licensing</option>
            <option>Registration</option>
            <option>Portal Access</option>
            <option>Verification</option>
            <option>Support</option>
          </select>
        </div>

        <div className="admin-form-group">
          <label>Status</label>
          <select>
            <option>Published</option>
            <option>Draft</option>
          </select>
        </div>

        <div className="admin-form-group full">
          <label>Keywords</label>
          <input
            type="text"
            placeholder="Example: renewal, licence, penalty, portal"
          />
        </div>

        <div className="admin-form-group">
          <label>Related Link Label</label>
          <input type="text" placeholder="Example: Open Licence Portal" />
        </div>

        <div className="admin-form-group">
          <label>Related Link URL</label>
          <input type="text" placeholder="https://..." />
        </div>

        <div className="admin-form-group checkbox-group full">
          <label className="checkbox-inline">
            <input type="checkbox" />
            <span>Mark as Featured FAQ</span>
          </label>
        </div>

        <div className="admin-form-actions full">
          <button type="button" className="admin-primary-btn">
            Save FAQ
          </button>

          <button type="button" className="admin-secondary-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}