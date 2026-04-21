import { useEffect, useMemo, useState } from "react";
import "../../assets/styles/faq.css";

import FAQNavbar from "../../components/faq/FAQNavbar";
import FAQHero from "../../components/faq/FAQHero";
import FAQSearchBar from "../../components/faq/FAQSearchBar";
import FAQCategoryFilter from "../../components/faq/FAQCategoryFilter";
import FAQAccordion from "../../components/faq/FAQAccordion";
import QuickLinks from "../../components/faq/QuickLinks";
import ChatbotLauncher from "../../components/chatbot/ChatbotLauncher";
import { useChatbot } from "../../context/ChatbotContext";

import { faqCategories, quickLinks } from "../../utils/faqData";
import { buildPublicFaqSections } from "../../utils/faqHelpers";
import { fetchPublicFaqs } from "../../services/faqService";

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const { openChatbot } = useChatbot();

  useEffect(() => {
  if (window.location.hash === "#faq-content") {
    setTimeout(() => {
      const faqContent = document.getElementById("faq-content");
      if (faqContent) {
        faqContent.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  }
}, []);

  useEffect(() => {
    const loadFaqs = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchPublicFaqs();
        setFaqs(data);
      } catch (err) {
        console.error("FAQ load error:", err);
        setError(err.message || "Failed to load FAQs.");
      } finally {
        setLoading(false);
      }
    };

    loadFaqs();
  }, []);

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

                <button className="chatbot-support-btn" onClick={openChatbot}>
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 18H7L3 21V6C3 4.89543 3.89543 4 5 4H15C16.1046 4 17 4.89543 17 6V8"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 17C10 15.8954 10.8954 15 12 15H19C20.1046 15 21 15.8954 21 17V20L18.5 18H12C10.8954 18 10 17.1046 10 16V17Z"
      fill="white"
    />
  </svg>
  <span>Support</span>
</button>
              </div>
            </aside>

            <section className="faq-content" id="faq-content">
              {loading ? (
                <div className="faq-empty">Loading FAQs...</div>
              ) : error ? (
                <div className="faq-empty">{error}</div>
              ) : filteredSections.length > 0 ? (
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
      <ChatbotLauncher />
    </div>
  );
}