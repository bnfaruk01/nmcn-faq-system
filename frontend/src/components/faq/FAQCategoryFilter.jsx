export default function FAQCategoryFilter({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);

    const faqContent = document.getElementById("faq-content");
    if (faqContent) {
      const y = faqContent.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="faq-category-card">
      <h3>FAQ Categories</h3>

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
          </button>
        ))}
      </div>
    </div>
  );
}