import { useState } from "react";
import { Link } from "react-router-dom";

export default function FAQNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <div className="faq-topbar">
        <div className="faq-container faq-topbar-inner">
          <div>Email: info@nmcn.gov.ng</div>
          <div>Plot 713, Cadastral Zone Life Camp, Gwarinpa, Abuja</div>
        </div>
      </div>

      <header className="faq-navbar">
        <div className="faq-container">
          <div className="faq-navbar-inner html-style-navbar">
            <div className="faq-brand-wrap">
              <img
                src="/images/nmcn-logo.png"
                alt="Nursing and Midwifery Council of Nigeria Logo"
                className="faq-real-logo"
              />

              <div className="faq-brand-text">
                <h2>Nursing and Midwifery Council of Nigeria</h2>
                <p>Frequently Asked Questions</p>
              </div>
            </div>

            <nav className="faq-main-nav">
              <a href="https://nmcn.gov.ng/" className="faq-nav-link">
                Main Website
              </a>
              <a href="https://nmcn.gov.ng/reach-us/" className="faq-nav-link">
                Reach Us
              </a>
              <a href="https://licence.nmcn.gov.ng/" className="faq-nav-link">
                Licence Portal
              </a>
              <Link to="/" className="faq-nav-link active-nav-link">
                FAQ
              </Link>
            </nav>

            <button
              className={`faq-hamburger ${menuOpen ? "open" : ""}`}
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

          <div className={`faq-mobile-menu ${menuOpen ? "show" : ""}`}>
            <a
              href="https://nmcn.gov.ng/"
              className="faq-mobile-link"
              onClick={closeMenu}
            >
              Main Website
            </a>
            <a
              href="https://nmcn.gov.ng/reach-us/"
              className="faq-mobile-link"
              onClick={closeMenu}
            >
              Reach Us
            </a>
            <a
              href="https://licence.nmcn.gov.ng/"
              className="faq-mobile-link"
              onClick={closeMenu}
            >
              Licence Portal
            </a>
            <Link to="/" className="faq-mobile-link active" onClick={closeMenu}>
  FAQ
</Link>

            <button className="faq-mobile-chatbot-btn" onClick={closeMenu}>
              Open Chatbot
            </button>
          </div>
        </div>
      </header>
    </>
  );
}