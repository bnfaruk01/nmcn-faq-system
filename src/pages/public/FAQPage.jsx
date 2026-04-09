import { useMemo, useState } from "react";
import "../../assets/styles/faq.css";

import FAQNavbar from "../../components/faq/FAQNavbar";
import FAQHero from "../../components/faq/FAQHero";
import FAQSearchBar from "../../components/faq/FAQSearchBar";
import FAQCategoryFilter from "../../components/faq/FAQCategoryFilter";
import FAQAccordion from "../../components/faq/FAQAccordion";
import QuickLinks from "../../components/faq/QuickLinks";

import { faqCategories, quickLinks } from "../../utils/faqData";
import { buildPublicFaqSections } from "../../utils/faqHelpers";
import { useFAQAdmin } from "../../context/FAQAdminContext";

export default function FAQPage() {
  const { faqs } = useFAQAdmin();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const publicSections = useMemo(() => buildPublicFaqSections(faqs), [faqs]);

  const filteredSections = useMemo(() => {
    return publicSections
      .filter((section) =>
        activeCategory === "all" ? true : section.id === activeCategory
      )
      .map((section) => {
        const filteredItems = section.items.filter((item) => {
          const search = searchTerm.toLowerCase();
          return (
            item.question.toLowerCase().includes(search) ||
            item.answer.toLowerCase().includes(search)
          );
        });

        return {
          ...section,
          items: filteredItems,
        };
      })
      .filter((section) => section.items.length > 0);
  }, [publicSections, searchTerm, activeCategory]);

  const clearSearch = () => {
    setSearchTerm("");
    setActiveCategory("all");
  };

  return (
    <div className="faq-page">
      <FAQNavbar />
      <FAQHero />

      <main className="faq-main">
        <div className="faq-container">
          <FAQSearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            clearSearch={clearSearch}
          />

          <div className="faq-layout">
            <aside className="faq-sidebar">
              <FAQCategoryFilter
                categories={faqCategories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />

              <QuickLinks links={quickLinks} />

              <div className="faq-support-card">
                <h3>Still need help?</h3>
                <p>
                  If you cannot find your answer here, the chatbot and support
                  team will help guide your request further.
                </p>

                <button className="nmcn-btn nmcn-btn-primary">
                  Contact Support
                </button>
              </div>
            </aside>

            <section className="faq-content" id="faq-content">
              {filteredSections.length > 0 ? (
                filteredSections.map((section) => (
                  <div className="faq-section-box" key={section.id}>
                    <div className="faq-section-header">
                      <div>
                        <h2>{section.title}</h2>
                        <p>{section.description}</p>
                      </div>
                      <span className="faq-badge">{section.badge}</span>
                    </div>

                    <FAQAccordion items={section.items} />
                  </div>
                ))
              ) : (
                <div className="faq-empty">
                  No matching FAQ found. Try another keyword or use support for
                  further help.
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}