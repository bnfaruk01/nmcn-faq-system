import { useState } from "react";
import FAQItem from "./FAQItem";

export default function FAQAccordion({ items }) {
  const [openItems, setOpenItems] = useState([]);

  const handleToggle = (id) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  return (
    <div className="faq-accordion">
      {items.map((item) => (
        <FAQItem
          key={item.id}
          item={item}
          isOpen={openItems.includes(item.id)}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
}