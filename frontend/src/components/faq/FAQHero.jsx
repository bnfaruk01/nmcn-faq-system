import { useChatbot } from "../../context/ChatbotContext";

export default function FAQHero() {
  const { openChatbot } = useChatbot();

  return (
    <section className="faq-hero">
      <div className="faq-container">
        <div className="faq-hero-grid">
          <div>
            <div className="faq-breadcrumb">
              <span>Home</span>
              <span>/</span>
              <span>FAQ</span>
            </div>

            <h1>Find quick answers to common NMCN questions</h1>

            <p>
              Explore frequently asked questions about licensing, registration,
              verification, portal access, and support services from the Nursing
              and Midwifery Council of Nigeria.
            </p>

            <div className="faq-hero-buttons">
              <a href="#faq-content" className="nmcn-btn nmcn-btn-primary">
                Browse FAQs
              </a>

              <button className="nmcn-btn nmcn-btn-secondary" onClick={openChatbot}>
                Ask Chat Support
              </button>
            </div>

            <div className="faq-hero-stats">
              <div className="faq-stat-pill">Fast Search</div>
              <div className="faq-stat-pill">Verified Answers</div>
              <div className="faq-stat-pill">Admin Escalation</div>
            </div>
          </div>

          <div className="faq-hero-card">
            <h3>Popular help topics</h3>
            <ul>
              <li>Licence renewal and penalty checks</li>
              <li>Portal login and password recovery</li>
              <li>Registration and record search</li>
              <li>Certificate verification</li>
              <li>Support escalation and contact options</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}