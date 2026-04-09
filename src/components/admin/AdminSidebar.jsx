import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "FAQ Management", path: "/admin/faqs" },
  { label: "Add FAQ", path: "/admin/faqs/new" },
  { label: "Categories", path: "/admin/categories" },
  { label: "Chatbot Logs", path: "/admin/chatbot-logs" },
  { label: "Tickets", path: "/admin/tickets" },
  { label: "Analytics", path: "/admin/analytics" },
  { label: "Settings", path: "/admin/settings" },
];

export default function AdminSidebar({ isOpen, closeSidebar }) {
  const location = useLocation();

  return (
    <aside className={`admin-sidebar ${isOpen ? "show" : ""}`}>
      <div className="admin-brand">
        <img src="/images/nmcn-logo.png" alt="NMCN Logo" />
        <div className="admin-brand-text">
          <h2>NMCN Admin</h2>
          <p>FAQ Support System</p>
        </div>
      </div>

      <nav className="admin-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`admin-nav-link ${
              location.pathname === item.path ? "active" : ""
            }`}
            onClick={closeSidebar}
          >
            <span>•</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}