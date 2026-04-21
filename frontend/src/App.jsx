import ErrorBoundary from "./components/common/ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ChatbotProvider } from "./context/ChatbotContext";

export default function App() {
  return (
    <ErrorBoundary>
      <ChatbotProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ChatbotProvider>
    </ErrorBoundary>
  );
}