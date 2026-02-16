import React from 'react';
import Header from '../../components/NmdHeader';
import Sidebar from '../../components/PhysioSidebar';
import './TreatmentPlans.css';

const TreatmentPlan = () => {
  const plans = [
    { id: 1, player: 'John Doe', injury: 'Hamstring Strain', duration: '4 weeks', progress: '40%', nextSession: '2025-08-15' },
    { id: 2, player: 'Alex Smith', injury: 'Ankle Sprain', duration: '3 weeks', progress: '60%', nextSession: '2025-08-14' },
    { id: 3, player: 'Chris Evans', injury: 'Shoulder Dislocation', duration: '8 weeks', progress: '25%', nextSession: '2025-08-16' },
    { id: 4, player: 'David Lee', injury: 'Knee Ligament Tear', duration: '12 weeks', progress: '10%', nextSession: '2025-08-18' },
    { id: 5, player: 'Mike Brown', injury: 'Groin Pull', duration: '5 weeks', progress: '50%', nextSession: '2025-08-20' },
  ];

  return (
    <div className="treatment-plan-page">
      <Sidebar />
      <div className="treatment-plan-main">
        <Header title="Treatment Plans" />

        <div className="treatment-plan-content">
          <h2>Active Treatment Plans</h2>
          <table className="treatment-plan-table">
            <thead>
              <tr>
                <th>Player</th>
                <th>Injury</th>
                <th>Duration</th>
                <th>Progress</th>
                <th>Next Session</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.player}</td>
                  <td>{plan.injury}</td>
                  <td>{plan.duration}</td>
                  <td>{plan.progress}</td>
                  <td>{plan.nextSession}</td>
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Add New Treatment Plan</h2>
          <form className="treatment-plan-form">
            <input type="text" placeholder="Player Name" />
            <input type="text" placeholder="Injury" />
            <input type="text" placeholder="Duration (e.g., 4 weeks)" />
            <input type="text" placeholder="Progress (e.g., 40%)" />
            <input type="date" placeholder="Next Session" />
            <textarea placeholder="Additional Notes"></textarea>
            <button type="submit" className="add-btn">Add Plan</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TreatmentPlan;
