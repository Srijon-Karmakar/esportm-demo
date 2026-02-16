import React from "react";
import Header from "../../components/NmdHeader";
import Sidebar from "../../components/AgentSidebar";
import "./OfferTracker.css";

const OfferTracker = () => {
  const offers = [
    { id: 1, title: "Club A Contract", player: "John Doe", value: "$5000", status: "Pending", date: "2025-08-10" },
    { id: 2, title: "Club B Endorsement", player: "Alex Smith", value: "$3000", status: "Accepted", date: "2025-07-28" },
    { id: 3, title: "Club C Transfer", player: "Sam Wilson", value: "$8000", status: "Declined", date: "2025-06-15" },
  ];

  return (
    <div className="offer-tracker-page">
      <Sidebar />
      <div className="offer-tracker-main">
        <Header title="Offer Tracker" />

        <div className="offer-stats">
          <div className="stat-card">Total Offers: 45</div>
          <div className="stat-card">Pending: 12</div>
          <div className="stat-card">Accepted: 20</div>
          <div className="stat-card">Declined: 13</div>
        </div>

        <div className="filter-section">
          <input type="text" placeholder="Search offers..." />
          <select>
            <option>Status Filter</option>
            <option>Pending</option>
            <option>Accepted</option>
            <option>Declined</option>
          </select>
          <button>Filter</button>
        </div>

        <div className="offer-list">
          {offers.map((offer) => (
            <div className="offer-card" key={offer.id}>
              <h3>{offer.title}</h3>
              <p><strong>Player:</strong> {offer.player}</p>
              <p><strong>Value:</strong> {offer.value}</p>
              <p><strong>Status:</strong> {offer.status}</p>
              <p><strong>Date:</strong> {offer.date}</p>
              <button>View Details</button>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          ))}
        </div>

        <div className="add-offer-form">
          <h3>Add New Offer</h3>
          <input type="text" placeholder="Offer Title" />
          <input type="text" placeholder="Player Name" />
          <input type="number" placeholder="Offer Value" />
          <select>
            <option>Status</option>
            <option>Pending</option>
            <option>Accepted</option>
            <option>Declined</option>
          </select>
          <input type="date" />
          <textarea placeholder="Additional Details"></textarea>
          <button>Add Offer</button>
        </div>
      </div>
    </div>
  );
};

export default OfferTracker;
