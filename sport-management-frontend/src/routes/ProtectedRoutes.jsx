// src/routes/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

function getValidToken() {
  const keys = ["token","playerToken","managerToken","accessToken","jwt","adminToken","superadminToken"];
  for (const k of keys) {
    const raw = localStorage.getItem(k) ?? sessionStorage.getItem(k);
    if (!raw || raw === "null" || raw === "undefined") continue;
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed === "string" && parsed.length > 10) return parsed;
      if (parsed?.token && parsed.token.length > 10) return parsed.token;
    } catch {
      if (typeof raw === "string" && raw.length > 10) return raw;
    }
  }
  return null;
}

export default function ProtectedRoute({ children }) {
  const location = useLocation();                 // <-- make sure this is imported
  const token = getValidToken();
  if (!token) {
    return <Navigate to="/login3" replace state={{ from: location }} />;
  }
  return children;
}
