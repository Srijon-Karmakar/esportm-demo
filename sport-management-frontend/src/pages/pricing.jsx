import React from "react";
import "./pricing.css";
// import VantaDot from "../components/vantaDot"; 
import Aurora from '../components/aurora'; 

const plans = [
  {
    title: "Beginner",
    price: "₹599/month",
    features: [
      "Basic Dashboard",
      "Limited Stats Access",
      "Join Public Tournaments",
    ],
    button: "Upgrade",
  },
  {
    title: "Pro Player",
    price: "₹1299/month",
    features: [
      "Advanced Performance KPIs",
      "Personal Training Analytics",
      "Priority Tournament Access",
    ],
    button: "Upgrade",
    highlight: true,
  },
  {
    title: "Club Elite",
    price: "₹3999/month",
    features: [
      "Full Club Dashboard",
      "Manage Players & Offers",
      "Advanced Club Analytics",
    ],
    button: "Upgrade",
  },
];

export default function Pricing() {
  return (
    <div className="pricing-page" style={{ position: 'relative', overflow: 'hidden' }}>
      <Aurora  
      colorStops={["#7cff67", "#5227FF", "#7cff67"]}
      amplitude={2.4}
      blend={1.1}
      />

      <h1 className="pricing-title">Choose Your Plan</h1>
      <p className="pricing-subtitle">Flexible pricing for players and clubs</p>
      <div className="pricing-container">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`plan-card ${plan.highlight ? "highlighted" : ""}`}
          >
            <h2>{plan.title}</h2>
            <p className="price">{plan.price}</p>
            <ul>
              {plan.features.map((feat, i) => (
                <li key={i}>✅ {feat}</li>
              ))}
            </ul>
            <button className="plan-btn">{plan.button}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
