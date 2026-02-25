import React, { useState } from "react";
import api from "../utils/axiosInstance";
import { BASE_URL } from "../utils/constants";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

// const BASE_URL = BASE_URL || "http://localhost:3000";


const Signup = () => {
  const [formData, setFormData] = useState({
    enrollment: "",
    email: "",
    name: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        `/api/signup`,
        formData
      );
      alert("Signup successful");
      navigate("/login");
    } catch (error) {
      alert("Error signing up");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="enrollment"
          placeholder="Enrollment No"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Signup</button>
      </form>
      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
};


export default Signup;