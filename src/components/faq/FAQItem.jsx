export default function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`}>
      <button className="faq-question" onClick={onToggle}>
        <span>{item.question}</span>
        <span className="faq-icon">+</span>
      </button>

      <div
        className="faq-answer"
        style={{ maxHeight: isOpen ? "300px" : "0px" }}
      >
        <div className="faq-answer-inner">
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  );
}