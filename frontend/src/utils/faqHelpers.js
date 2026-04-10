export function buildPublicFaqSections(faqs) {
  const categoryMap = {
    Licensing: {
      id: "licensing",
      title: "Licensing and Renewal",
      description:
        "Answers related to licence renewal, penalties, and profile updates.",
      badge: "Licensing",
      items: [],
    },
    Registration: {
      id: "registration",
      title: "Registration",
      description:
        "Questions on registration, profile matching, and public usage.",
      badge: "Registration",
      items: [],
    },
    "Portal Access": {
      id: "portal",
      title: "Portal Access",
      description: "Help with login, account access, and navigation.",
      badge: "Portal",
      items: [],
    },
    Verification: {
      id: "verification",
      title: "Verification and Public Services",
      description:
        "Questions about certificate verification and public service links.",
      badge: "Verification",
      items: [],
    },
    Support: {
      id: "support",
      title: "Support and Contact",
      description: "Guidance on where to go when you still need help.",
      badge: "Support",
      items: [],
    },
  };

  faqs.forEach((faq) => {
    if (categoryMap[faq.category]) {
      categoryMap[faq.category].items.push({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        relatedLinkLabel: faq.related_link_label,
        relatedLinkUrl: faq.related_link_url,
        featured: faq.featured,
      });
    }
  });

  return Object.values(categoryMap).filter(
    (section) => section.items.length > 0
  );
}