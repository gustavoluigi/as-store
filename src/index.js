import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
