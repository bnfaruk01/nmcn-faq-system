export default function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`}>
      <button className="faq-question" onClick={onToggle}>
        <span>{item.question}</span>
        <span className="faq-icon">+</span>
      </button>

      <div
        className="faq-answer"
        style={{ maxHeight: isOpen ? "320px" : "0px" }}
      >
        <div className="faq-answer-inner">
          <p>{item.answer}</p>

          {item.relatedLinkLabel && item.relatedLinkUrl && (
            <a
              href={item.relatedLinkUrl}
              target="_blank"
              rel="noreferrer"
            >
              {item.relatedLinkLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}