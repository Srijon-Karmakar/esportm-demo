import React, { useState } from 'react';
import Sidebar from '../../components/NutriSidebar';
import Header from '../../components/NmdHeader';
import './dietPlans.css';

const MealPlans = () => {
  const [mealPlans, setMealPlans] = useState([
    { id: 1, name: 'High Protein Plan', mealsPerDay: 5, calories: 2500, duration: '4 weeks' },
    { id: 2, name: 'Weight Loss Plan', mealsPerDay: 4, calories: 1800, duration: '6 weeks' },
    { id: 3, name: 'Muscle Gain Plan', mealsPerDay: 6, calories: 3000, duration: '8 weeks' }
  ]);

  const [newPlan, setNewPlan] = useState({
    name: '',
    mealsPerDay: '',
    calories: '',
    duration: ''
  });

  const handleAddPlan = () => {
    if (!newPlan.name) return;
    setMealPlans([...mealPlans, { id: mealPlans.length + 1, ...newPlan }]);
    setNewPlan({ name: '', mealsPerDay: '', calories: '', duration: '' });
  };

  return (
    <div className="mealplans-container">
      <Sidebar />
      <div className="mealplans-main">
        <Header title="Diet Plans" />
        <div className="mealplans-wrapper">

          {/* Summary Cards */}
          <div className="mealplans-summary">
            <div className="mealplans-card">Total Plans: {mealPlans.length}</div>
            <div className="mealplans-card">Active Clients: 25</div>
            <div className="mealplans-card">Avg. Calories: {Math.round(mealPlans.reduce((a, b) => a + parseInt(b.calories), 0) / mealPlans.length)}</div>
          </div>

          {/* Add Plan */}
          <div className="mealplans-add">
            <h3>Add New Meal Plan</h3>
            <input type="text" placeholder="Plan Name" value={newPlan.name} onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })} />
            <input type="number" placeholder="Meals Per Day" value={newPlan.mealsPerDay} onChange={(e) => setNewPlan({ ...newPlan, mealsPerDay: e.target.value })} />
            <input type="number" placeholder="Calories" value={newPlan.calories} onChange={(e) => setNewPlan({ ...newPlan, calories: e.target.value })} />
            <input type="text" placeholder="Duration" value={newPlan.duration} onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })} />
            <button onClick={handleAddPlan}>Add Plan</button>
          </div>

          {/* Plans Table */}
          <table className="mealplans-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Meals/Day</th>
                <th>Calories</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mealPlans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.name}</td>
                  <td>{plan.mealsPerDay}</td>
                  <td>{plan.calories}</td>
                  <td>{plan.duration}</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Placeholder Charts */}
          <div className="mealplans-charts">
            <div className="mealplans-card">📊 Calories Chart (Placeholder)</div>
            <div className="mealplans-card">📈 Client Progress Chart (Placeholder)</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MealPlans;
