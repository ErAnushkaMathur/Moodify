import React, { useState } from "react";
import "../style/register.scss";
import "../../shared/styles/button.scss";
import FormGroup from "../components/FormGroup";
import MoodPlane from "../components/MoodPlane";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await handleRegister(name, email, password);
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  }

  return (
    <main className="register-page">
      <MoodPlane />
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <FormGroup
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name"
            placeholder="Enter your name"
          />
          <FormGroup
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="Enter your email"
          />
          <FormGroup
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Enter your password"
          />
          <button type="submit" className="button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;