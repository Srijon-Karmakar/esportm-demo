





// import React, { useState } from "react";
// import "./BookDemo.css";
// import NmdHeader from "../components/NmdHeader";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { API_BASE } from "../lib/api";

// const BookDemo = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     organization: "",
//     message: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState({ type: "", text: "" });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setToast({ type: "", text: "" });
//     setLoading(true);
//     try {
//       const res = await axios.post(`${API_BASE}/api/book-demo`, formData);
//       setToast({ type: "success", text: res.data?.message || "Submitted!" });
//       setFormData({ name: "", email: "", organization: "", message: "" });
//     } catch (error) {
//       const msg =
//         error.response?.data?.message ||
//         error.message ||
//         "Submission failed.";
//       setToast({ type: "error", text: msg });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="demo-page">
//       <NmdHeader title="Book a Demo" />
//       <motion.div
//         className="demo-container"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="form-section neumorphic">
//           <h2 className="gradient-text">Book a Free Demo</h2>

//           {toast.text ? (
//             <div
//               className={`alert ${toast.type === "success" ? "ok" : "err"}`}
//               role="alert"
//             >
//               {toast.text}
//             </div>
//           ) : null}

//           <form onSubmit={handleSubmit} className="demo-form">
//             <input
//               type="text"
//               name="name"
//               placeholder="Your Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               minLength={2}
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="text"
//               name="organization"
//               placeholder="Club / Organization"
//               value={formData.organization}
//               onChange={handleChange}
//             />
//             <textarea
//               name="message"
//               placeholder="Tell us your needs..."
//               value={formData.message}
//               onChange={handleChange}
//               rows={4}
//               maxLength={2000}
//             />
//             <button type="submit" className="neumorphic-btn" disabled={loading}>
//               {loading ? "Booking…" : "Book Demo"}
//             </button>
//           </form>
//           <p className="microcopy">
//             By submitting, you agree to be contacted about a demo.
//           </p>
//         </div>

//         <div className="contact-section neumorphic">
//           <h3>Contact Us</h3>
//           <p>
//             <strong>Email:</strong> support@sportbit.ai
//           </p>
//           <p>
//             <strong>Phone:</strong> +91 98765 43210
//           </p>
//           <p>
//             <strong>Address:</strong> 2nd Floor, SportBit HQ, Kolkata, India
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default BookDemo;
















import React, { useState } from "react";
import NmdHeader from "../components/NmdHeader";
import { motion } from "framer-motion";
import axios from "axios";
import { API_BASE } from "../lib/api";

const BookDemo = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast({ type: "", text: "" });
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/book-demo`, formData);
      setToast({ type: "success", text: res.data?.message || "Submitted!" });
      setFormData({ name: "", email: "", organization: "", message: "" });
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Submission failed.";
      setToast({ type: "error", text: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-screen px-5 py-6 font-sans"
      style={{ background: "#e0e5ec" }}
    >
      <NmdHeader title="Book a Demo" />

      <motion.div
        className="mt-10 flex flex-wrap justify-center gap-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Form Card */}
        <div
          className="w-[350px] rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1"
          style={{
            background: "#e0e5ec",
            boxShadow:
              "8px 8px 16px #cbd1d8, -8px -8px 16px #ffffff",
          }}
        >
          <h2 className="mb-6 text-2xl font-bold bg-gradient-to-tr from-[#6a11cb] to-[#2575fc] bg-clip-text text-transparent">
            Book a Free Demo
          </h2>

          {toast.text ? (
            <div
              role="alert"
              className={`mb-3 rounded-xl border px-3 py-2 text-sm ${
                toast.type === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-rose-200 bg-rose-50 text-rose-800"
              }`}
            >
              {toast.text}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
              className="w-full rounded-xl px-4 py-3 text-[16px] text-neutral-800 outline-none placeholder:text-neutral-400"
              style={{
                background: "#e0e5ec",
                boxShadow:
                  "inset 4px 4px 8px #cbd1d8, inset -4px -4px 8px #ffffff",
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl px-4 py-3 text-[16px] text-neutral-800 outline-none placeholder:text-neutral-400"
              style={{
                background: "#e0e5ec",
                boxShadow:
                  "inset 4px 4px 8px #cbd1d8, inset -4px -4px 8px #ffffff",
              }}
            />
            <input
              type="text"
              name="organization"
              placeholder="Club / Organization"
              value={formData.organization}
              onChange={handleChange}
              className="w-full rounded-xl px-4 py-3 text-[16px] text-neutral-800 outline-none placeholder:text-neutral-400"
              style={{
                background: "#e0e5ec",
                boxShadow:
                  "inset 4px 4px 8px #cbd1d8, inset -4px -4px 8px #ffffff",
              }}
            />
            <textarea
              name="message"
              placeholder="Tell us your needs..."
              value={formData.message}
              onChange={handleChange}
              rows={4}
              maxLength={2000}
              className="h-[100px] w-full resize-none rounded-xl px-4 py-3 text-[16px] text-neutral-800 outline-none placeholder:text-neutral-400"
              style={{
                background: "#e0e5ec",
                boxShadow:
                  "inset 4px 4px 8px #cbd1d8, inset -4px -4px 8px #ffffff",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full select-none rounded-xl px-4 py-3 text-[16px] font-bold text-[#6a11cb] transition-all active:scale-[.99] disabled:opacity-60"
              style={{
                background: "#cdddf1",
                boxShadow:
                  "6px 6px 12px #cbd1d8, -6px -6px 12px #ffffff",
              }}
              onMouseDown={(e) => {
                // simple press effect
                e.currentTarget.style.boxShadow =
                  "inset 4px 4px 8px #cbd1d8, inset -4px -4px 8px #ffffff";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.boxShadow =
                  "6px 6px 12px #cbd1d8, -6px -6px 12px #ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "6px 6px 12px #cbd1d8, -6px -6px 12px #ffffff";
              }}
            >
              {loading ? "Booking…" : "Book Demo"}
            </button>
          </form>

          <p className="mt-2 text-xs text-neutral-500">
            By submitting, you agree to be contacted about a demo.
          </p>
        </div>

        {/* Contact Card */}
        <div
          className="w-[350px] rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1"
          style={{
            background: "#e0e5ec",
            boxShadow:
              "8px 8px 16px #cbd1d8, -8px -8px 16px #ffffff",
          }}
        >
          <h3 className="mb-4 text-xl font-semibold text-neutral-700">
            Contact Us
          </h3>
          <p className="mb-2 text-neutral-700">
            <strong className="font-semibold">Email:</strong>{" "}
            support@sportbit.ai
          </p>
          <p className="mb-2 text-neutral-700">
            <strong className="font-semibold">Phone:</strong> +91 98765 43210
          </p>
          <p className="text-neutral-700">
            <strong className="font-semibold">Address:</strong> 2nd Floor,
            SportBit HQ, Kolkata, India
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default BookDemo;
