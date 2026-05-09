import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { GjhmailSender } from "./pages/Gjhmail";
import { SettingsPage } from "./pages/Settings";
import { AuthCallback } from "./api/callback";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/app" element={<Login />} />
      <Route path="/gjhmail" element={<GjhmailSender />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/unauthorized" element={<Login />} />
    </Routes>
  );
}

export default App;
