export default function FAQSearchBar({ searchTerm, setSearchTerm, clearSearch }) {
  return (
    <div className="faq-search-card">
      <div className="faq-search-box">
        <span>🔍</span>
        <input
          type="text"
          placeholder="Search questions, keywords, or services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <button className="nmcn-btn nmcn-btn-primary" onClick={clearSearch}>
        Clear Search
      </button>
    </div>
  );
}