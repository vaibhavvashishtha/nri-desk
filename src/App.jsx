import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppShell from "./pages/AppShell.jsx";
import Privacy from "./pages/Privacy.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </BrowserRouter>
  );
}
