import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from '../src/App/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import "./styles.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
);

reportWebVitals();
