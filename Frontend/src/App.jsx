import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { NotificationProvider } from "./context/NotificationContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Router>
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
      <NotificationProvider>
        <AppRoutes />
      </NotificationProvider>
    </Router>
  );
}

export default App;