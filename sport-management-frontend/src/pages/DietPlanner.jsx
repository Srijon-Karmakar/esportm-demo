import React, { useState } from 'react';
import './DietPlanner.css';

const DietPlanner = () => {
  const [goal, setGoal] = useState('Muscle Gain');
  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState('');

  const addMeal = () => {
    if (newMeal.trim()) {
      setMeals([...meals, newMeal]);
      setNewMeal('');
    }
  };

  return (
    <div className="diet-container">
      <h1 className="diet-title">🥗 Diet Planner</h1>

      <div className="neumorphic goal-selector">
        <label>Goal:</label>
        <select value={goal} onChange={(e) => setGoal(e.target.value)}>
          <option>Muscle Gain</option>
          <option>Weight Loss</option>
          <option>Stamina Boost</option>
        </select>
      </div>

      <div className="neumorphic macro-box">
        <h3>Daily Macros</h3>
        <ul>
          <li>Calories: 2500 kcal</li>
          <li>Protein: 150g</li>
          <li>Carbs: 300g</li>
          <li>Fats: 70g</li>
        </ul>
      </div>

      <div className="neumorphic meal-planner">
        <h3>Today's Meals</h3>
        <ul>
          {meals.map((meal, index) => (
            <li key={index}>{meal}</li>
          ))}
        </ul>
        <div className="meal-input">
          <input
            type="text"
            value={newMeal}
            onChange={(e) => setNewMeal(e.target.value)}
            placeholder="Add a meal (e.g., Grilled Chicken)"
          />
          <button onClick={addMeal}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default DietPlanner;
