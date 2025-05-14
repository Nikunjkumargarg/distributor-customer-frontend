// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/loginForm";
import Dashboard from "./components/dashboard";
import UploadDistributors from "./components/uploadDistributos";
import CreateCustomer from "./components/createCustomers";
import "./styles.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload-distributors" element={<UploadDistributors />} />
        <Route path="/create-customer" element={<CreateCustomer />} />
      </Routes>
    </Router>
  );
}

export default App;
