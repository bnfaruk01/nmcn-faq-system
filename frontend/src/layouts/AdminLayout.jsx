import { useState } from "react";
import "../assets/styles/admin.css";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";

export default function AdminLayout({ title, subtitle, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-page">
      <div className="admin-layout">
        <AdminSidebar
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        <div className="admin-main">
          <AdminHeader
            title={title}
            subtitle={subtitle}
            onMenuClick={() => setSidebarOpen((prev) => !prev)}
          />

          <main className="admin-content">{children}</main>
        </div>
      </div>
    </div>
  );
}