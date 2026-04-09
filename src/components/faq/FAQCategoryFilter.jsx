export default function FAQCategoryFilter({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <div className="faq-card">
      <h3>FAQ Categories</h3>

      <div className="faq-filter-list">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`faq-filter-btn ${
              activeCategory === category.id ? "active" : ""
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}