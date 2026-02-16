

// import axios from 'axios';  

// const instance = axios.create({
//   baseURL: 'http://localhost:5000',  
//   withCredentials: false,             
// });

// export default instance;













// src/api/axios.js
// import axios from "axios";
// const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000" });

// function getToken() {
//   const keys = ["token","playerToken","managerToken","accessToken","jwt"];
//   for (const k of keys) {
//     const v = localStorage.getItem(k) || sessionStorage.getItem(k);
//     if (!v) continue;
//     try { const p = JSON.parse(v); if (typeof p === "string") return p; if (p?.token) return p.token; } catch { return v; }
//   }
//   return null;
// }

// api.interceptors.request.use(cfg => {
//   const t = getToken();
//   if (t) cfg.headers.Authorization = `Bearer ${t}`;
//   return cfg;
// });

// api.interceptors.response.use(
//   r => r,
//   err => {
//     if (err?.response?.status === 401) {
//       const from = encodeURIComponent(location.pathname + location.search);
//       window.location.href = `/login3?from=${from}`;
//     }
//     return Promise.reject(err);
//   }
// );














// actual and working
// import axios from "axios";
// const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000" })
// function getValidToken() {
//   const keys = ["token","playerToken","managerToken","accessToken","jwt","adminToken","superadminToken"];
//   for (const k of keys) {
//     const raw = localStorage.getItem(k) ?? sessionStorage.getItem(k);
//     if (!raw || raw === "null" || raw === "undefined") continue;
//     try {
//       const parsed = JSON.parse(raw);
//       if (typeof parsed === "string" && parsed.length > 10) return parsed;
//       if (parsed?.token && parsed.token.length > 10) return parsed.token;
//     } catch {
//       if (typeof raw === "string" && raw.length > 10) return raw;
//     }
//   }
//   return null;
// }

// api.interceptors.request.use(cfg => {
//   const t = getValidToken();
//   if (t) cfg.headers.Authorization = `Bearer ${t}`;
//   return cfg;
// });

// export default api;











// // chat update 
// // ✨ UPDATED axios that works without .env
// import axios from "axios";

// // Decide backend host:
// // - in dev: use http://localhost:5000
// // - in prod (same-origin deploy): use current origin
// const API_HOST =
//   typeof window !== "undefined" && window.location.hostname === "localhost"
//     ? "http://localhost:5000"        // dev
//     : window.location.origin;         // prod (same domain)

// const api = axios.create({
//   // Chat lives under /api, so keep /api here
//   baseURL: `${API_HOST.replace(/\/$/, "")}/api`,  // ✨ UPDATED
// });

// function getValidToken() {
//   const keys = ["token","playerToken","managerToken","accessToken","jwt","adminToken","superadminToken"];
//   for (const k of keys) {
//     const raw = localStorage.getItem(k) ?? sessionStorage.getItem(k);
//     if (!raw || raw === "null" || raw === "undefined") continue;
//     try {
//       const parsed = JSON.parse(raw);
//       if (typeof parsed === "string" && parsed.length > 10) return parsed;
//       if (parsed?.token && parsed.token.length > 10) return parsed.token;
//     } catch {
//       if (typeof raw === "string" && raw.length > 10) return raw;
//     }
//   }
//   return null;
// }

// api.interceptors.request.use(cfg => {
//   const t = getValidToken();
//   if (t) cfg.headers.Authorization = `Bearer ${t}`;
//   return cfg;
// });

// export default api;













// update for registration and delete error
import axios from "axios";

const isLocal = typeof window !== "undefined" && window.location.hostname === "localhost";
const API_HOST = isLocal ? "http://localhost:5000" : window.location.origin;
// If your backend lives under /api in prod, append it here instead:
// const API_BASE = API_HOST.replace(/\/$/, "") + "/api";
const API_BASE = API_HOST.replace(/\/$/, "");

const api = axios.create({ baseURL: API_BASE });

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

api.interceptors.request.use(cfg => {
  const t = getValidToken();
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

export default api;


