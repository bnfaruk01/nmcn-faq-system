export const faqCategories = [
  { id: "all", label: "All Questions" },
  { id: "licensing", label: "Licensing" },
  { id: "registration", label: "Registration" },
  { id: "portal", label: "Portal Access" },
  { id: "verification", label: "Verification" },
  { id: "support", label: "Support" },
];

export const faqSections = [
  {
    id: "licensing",
    title: "Licensing and Renewal",
    description: "Answers related to licence renewal, penalties, and profile updates.",
    badge: "Licensing",
    items: [
      {
        id: 1,
        question: "I generated an RRR outside the portal and have already paid. How do I complete my renewal or change of name application?",
        answer:
          "If you started the process outside the portal by paying through Remita first, the application should be completed outside the portal as well. Fill the relevant hard-copy form, submit it to the nearest NMCN office, and keep your payment evidence and supporting documents available.",
      },
      {
        id: 2,
        question: "I have not renewed my licence for a while. How do I know the penalty?",
        answer:
          "When you begin a renewal or change-of-name application on the portal, the total fee is usually displayed together with any penalty and service charges.",
      },
      {
        id: 3,
        question: "My licence has not expired yet. Can I still update my profile on the licence portal?",
        answer:
          "Yes. Nurses and midwives registered with NMCN are expected to update their profile on the portal even if the licence is still valid.",
      },
    ],
  },
  {
    id: "registration",
    title: "Registration",
    description: "Questions on registration, profile matching, and public usage.",
    badge: "Registration",
    items: [
      {
        id: 4,
        question: "I filled the Professional Update Form, but my registration number cannot be found. What should I do?",
        answer:
          "If your record does not appear after entering your registration number, use the support channel so the Council can review and confirm why your record is not showing.",
      },
      {
        id: 5,
        question: "Who is this FAQ page for?",
        answer:
          "This FAQ page is for nurses, midwives, applicants, institutions, and members of the public seeking guidance on NMCN services.",
      },
    ],
  },
  {
    id: "portal",
    title: "Portal Access",
    description: "Help with login, account access, and navigation.",
    badge: "Portal",
    items: [
      {
        id: 6,
        question: "I cannot log into my profile. It keeps saying invalid username or password. What should I do?",
        answer:
          "Use the password recovery option on the portal login page and follow the reset instructions provided there.",
      },
      {
        id: 7,
        question: "How do I access the NMCN portal?",
        answer:
          "You can access the portal through the official NMCN portal link from the main website navigation or service page.",
      },
    ],
  },
  {
    id: "verification",
    title: "Verification and Public Services",
    description: "Questions about certificate verification and public service links.",
    badge: "Verification",
    items: [
      {
        id: 8,
        question: "How can I verify certificates or request good standing?",
        answer:
          "Use the official verification or good standing service provided by NMCN through the website and portal links.",
      },
      {
        id: 9,
        question: "Where can I find approved schools, forms, and guidelines?",
        answer:
          "These resources are usually available from the main website under approved schools, forms, school guidelines, and other professional resources.",
      },
    ],
  },
  {
    id: "support",
    title: "Support and Contact",
    description: "Guidance on where to go when you still need help.",
    badge: "Support",
    items: [
      {
        id: 10,
        question: "What should I do if my issue is not listed on this FAQ page?",
        answer:
          "If your issue is not listed, open the chatbot or proceed to contact support so your question can be reviewed and escalated if necessary.",
      },
      {
        id: 11,
        question: "What contact details should appear on the FAQ page?",
        answer:
          "The page should provide official NMCN contact details such as the website, support channel, phone number, and email address.",
      },
    ],
  },
];

export const quickLinks = [
  { label: "Renewal of License", href: "#" },
  { label: "Member Registration", href: "#" },
  { label: "Verification of Certificates", href: "#" },
  { label: "Good Standing", href: "#" },
  { label: "Reach Us", href: "#" },
];