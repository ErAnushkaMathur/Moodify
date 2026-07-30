import React from "react";
import "../style/register.scss";
import FormGroup from "../components/FormGroup";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <main className="register-page">
      <div className="form-container">
        <h2>Register</h2>
        <form>
          <FormGroup label="Name" placeholder="Enter your name" />
          <FormGroup label="Email" placeholder="Enter your email" />
          <FormGroup label="Password" placeholder="Enter your password" />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;