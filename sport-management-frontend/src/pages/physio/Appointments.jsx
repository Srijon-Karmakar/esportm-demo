import React from "react";
import Sidebar from "../../components/PhysioSidebar";
import Header from "../../components/NmdHeader";
import "./Appointments.css";

const PhysioAppointments = () => {
  return (
    <div className="physio-appointments-page">
      <Sidebar />
      <div className="main-content">
        <Header title="Physio Appointments" />

        <div className="appointments-container">
          <h2>Upcoming Appointments</h2>

          <div className="appointments-grid">
            {Array.from({ length: 20 }, (_, i) => (
              <div className="appointment-card" key={i}>
                <h3>Patient {i + 1}</h3>
                <p><strong>Date:</strong> 2025-08-{(i % 30) + 1}</p>
                <p><strong>Time:</strong> {9 + (i % 8)}:00 AM</p>
                <p><strong>Type:</strong> Physiotherapy Session</p>
                <p><strong>Status:</strong> Confirmed</p>
                <button className="view-btn">View Details</button>
              </div>
            ))}
          </div>

          <div className="form-section">
            <h2>Book New Appointment</h2>
            <form>
              <label>Patient Name</label>
              <input type="text" placeholder="Enter patient name" />

              <label>Date</label>
              <input type="date" />

              <label>Time</label>
              <input type="time" />

              <label>Type of Session</label>
              <select>
                <option>Physiotherapy</option>
                <option>Rehabilitation</option>
                <option>Massage Therapy</option>
              </select>

              <label>Notes</label>
              <textarea placeholder="Add any special notes"></textarea>

              <button type="submit" className="submit-btn">
                Schedule Appointment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysioAppointments;
