import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import './index.css';
import App from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// render - функция обрабатывает JSX и отрисовывает результат в DOM -  в root
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
