import "@fontsource/manrope/300.css"; // Light
import "@fontsource/manrope/400.css"; // Regular
import "@fontsource/manrope/500.css"; // Medium
import "@fontsource/manrope/600.css"; // Semi-bold
import "@fontsource/manrope/700.css"; // Bold
import "@fontsource/manrope/800.css"; // Extra-bold


import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
