const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log("API_BASE_URL:", API_BASE_URL);

export async function fetchPublicFaqs() {
  const url = `${API_BASE_URL}/faqs/public`;
  console.log("Fetching public FAQs from:", url);

  const response = await fetch(url);

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