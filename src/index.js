import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

/* SPA(single page application) => index.html 연결고리 */
/* index.html에 있는 div 아이디 root를 가져와서 해등 App컴포넌트를 랜더링시킨다. */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
