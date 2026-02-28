import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";

const getRouterBasename = () => {
  const publicUrl = process.env.PUBLIC_URL;

  if (!publicUrl) {
    return '/';
  }

  try {
    const url = new URL(publicUrl, window.location.origin);
    const pathname = url.pathname.replace(/\/$/, '');
    return pathname || '/';
  } catch {
    const pathname = publicUrl.replace(/^https?:\/\/[^/]+/i, '').replace(/\/$/, '');
    return pathname || '/';
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={getRouterBasename()}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

