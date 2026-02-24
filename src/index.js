import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import 'react-toastify/ReactToastify.css';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
   

  <App />

    </BrowserRouter>
  </React.StrictMode>
);


serviceWorkerRegistration.unregister();

setTimeout(() => {
  const loader = document.getElementById("initial-loader");
  if (loader) {
    loader.style.opacity = "0";
    loader.style.transition = "opacity 0.5s ease";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
}, 3000);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
