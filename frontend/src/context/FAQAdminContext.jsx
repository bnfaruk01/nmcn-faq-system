import { createContext, useContext, useMemo, useState } from "react";
import { adminFaqs as initialFaqs } from "../utils/adminFaqData";

const FAQAdminContext = createContext();

export function FAQAdminProvider({ children }) {
  const [faqs, setFaqs] = useState(initialFaqs);

  const addFaq = (faqData) => {
    const newFaq = {
      id: Date.now(),
      ...faqData,
      updatedAt: new Date().toISOString().split("T")[0],
    };

    setFaqs((prev) => [newFaq, ...prev]);
  };

  const deleteFaq = (id) => {
    setFaqs((prev) => prev.filter((faq) => faq.id !== id));
  };

  const getFaqById = (id) => {
    return faqs.find((faq) => String(faq.id) === String(id));
  };

  const updateFaq = (id, updatedData) => {
    setFaqs((prev) =>
      prev.map((faq) =>
        String(faq.id) === String(id)
          ? {
              ...faq,
              ...updatedData,
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : faq
      )
    );
  };

  const value = useMemo(
    () => ({
      faqs,
      addFaq,
      deleteFaq,
      getFaqById,
      updateFaq,
    }),
    [faqs]
  );

  return (
    <FAQAdminContext.Provider value={value}>
      {children}
    </FAQAdminContext.Provider>
  );
}

export function useFAQAdmin() {
  return useContext(FAQAdminContext);
}