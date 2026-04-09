export default function QuickLinks({ links }) {
  return (
    <div className="faq-links-card">
      <h3>Quick Links</h3>

      <div className="faq-link-list">
        {links.map((link, index) => (
          <a key={index} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}