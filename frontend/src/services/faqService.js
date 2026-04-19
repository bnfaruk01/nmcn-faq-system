const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export async function fetchPublicFaqs() {
  const response = await fetch(`${API_BASE_URL}/faqs/public`);

  if (!response.ok) {
    throw new Error(`Failed to fetch public FAQs: ${response.status}`);
  }

  return response.json();
}

export async function fetchAllFaqs() {
  const response = await fetch(`${API_BASE_URL}/faqs`);

  if (!response.ok) {
    throw new Error(`Failed to fetch FAQs: ${response.status}`);
  }

  return response.json();
}

export async function fetchFaqById(id) {
  const response = await fetch(`${API_BASE_URL}/faqs`);

  if (!response.ok) {
    throw new Error(`Failed to fetch FAQs: ${response.status}`);
  }

  const faqs = await response.json();
  return faqs.find((faq) => String(faq.id) === String(id));
}

export async function createFaq(faqData) {
  const response = await fetch(`${API_BASE_URL}/faqs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(faqData),
  });

  if (!response.ok) {
    throw new Error(`Failed to create FAQ: ${response.status}`);
  }

  return response.json();
}

export async function updateFaq(id, faqData) {
  const response = await fetch(`${API_BASE_URL}/faqs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(faqData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update FAQ: ${response.status}`);
  }

  return response.json();
}

export async function deleteFaq(id) {
  const response = await fetch(`${API_BASE_URL}/faqs/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete FAQ: ${response.status}`);
  }

  return response.json();
}

export async function askChatbot(question) {
  const response = await fetch(`${API_BASE_URL}/chatbot/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get chatbot response: ${response.status}`);
  }

  return response.json();
}