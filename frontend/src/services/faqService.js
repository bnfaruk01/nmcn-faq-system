const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchPublicFaqs() {
  const response = await fetch(`${API_BASE_URL}/faqs/public`);

  if (!response.ok) {
    throw new Error("Failed to fetch public FAQs");
  }

  return response.json();
}

export async function fetchAllFaqs() {
  const response = await fetch(`${API_BASE_URL}/faqs`);

  if (!response.ok) {
    throw new Error("Failed to fetch FAQs");
  }

  return response.json();
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
    throw new Error("Failed to create FAQ");
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
    throw new Error("Failed to update FAQ");
  }

  return response.json();
}

export async function deleteFaq(id) {
  const response = await fetch(`${API_BASE_URL}/faqs/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete FAQ");
  }

  return response.json();
}