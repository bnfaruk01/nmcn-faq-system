import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import FAQPage from "../pages/public/FAQPage";

// Admin Pages
import LoginPage from "../pages/admin/LoginPage";
import DashboardPage from "../pages/admin/DashboardPage";
import FAQManagementPage from "../pages/admin/FAQManagementPage";
import AddFAQPage from "../pages/admin/AddFAQPage";
import CategoryPage from "../pages/admin/CategoryPage";
import ChatbotLogsPage from "../pages/admin/ChatbotLogsPage";
import TicketsPage from "../pages/admin/TicketsPage";
import AnalyticsPage from "../pages/admin/AnalyticsPage";
import SettingsPage from "../pages/admin/SettingsPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FAQPage />} />
        <Route path="/faq" element={<FAQPage />} />

        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/faqs" element={<FAQManagementPage />} />
        <Route path="/admin/faqs/new" element={<AddFAQPage />} />
        <Route path="/admin/categories" element={<CategoryPage />} />
        <Route path="/admin/chatbot-logs" element={<ChatbotLogsPage />} />
        <Route path="/admin/tickets" element={<TicketsPage />} />
        <Route path="/admin/analytics" element={<AnalyticsPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}