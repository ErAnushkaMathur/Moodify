import React, { useState } from "react";
import "../style/login.scss";
import MoodPlane from "../components/MoodPlane";
import "../../shared/styles/button.scss";
import FormGroup from "../components/FormGroup";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const { loading, handleLogin } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin(email, password);
    navigate("/");
  }
   
  const handleDemoLogin = async () => {
    const demoEmail = "recruiter_demo@gmail.com";
    const demoPassword = "Demo@123";

    setEmail(demoEmail);
    setPassword(demoPassword);

    await handleLogin(demoEmail, demoPassword);
    navigate("/");
};
  return (
    <main className="login-page">
      <MoodPlane/>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <FormGroup
            value={email} onChange={(e) => setEmail(e.target.value)}
            label="Email" placeholder="Enter your email" />
          <FormGroup
            value={password} onChange={(e) => setPassword(e.target.value)}
            label="Password" placeholder="Enter your password" />
          <button type="submit"
           className="button"
            disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
           <p>Recruiter? Try the demo account:</p>

          <button type="button" onClick={handleDemoLogin}>
    Use Demo Account
</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;