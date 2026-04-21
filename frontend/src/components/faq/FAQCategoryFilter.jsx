export default function FAQCategoryFilter({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);

    const faqContent = document.getElementById("faq-content");
    if (faqContent) {
      faqContent.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="faq-category-card">
      <h3>Browse by category</h3>

      <div className="faq-category-list">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`faq-category-btn ${
              activeCategory === category.id ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category.id)}
          >
            <span>{category.label}</span>
            <span>{category.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}