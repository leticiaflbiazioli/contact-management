"use client";

import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../config";
import LoginWrapper from "./styles";

const Login = () => {
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });
      const { access_token } = response.data;
      await localStorage.setItem("token", access_token);
      // TODO: REDIRECIONAR PRA PAGINA DE CONTATO
    } catch (error) {
      alert("Login failed. Invalid username or password");
    }
  };

  return (
    <LoginWrapper>
      <div className="container">
        <div className="card">
          <h1 className="title">Welcome Back!</h1>
          <p className="subtitle">Login to your account</p>
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
            <button type="submit" className="button">
              Login
            </button>
          </form>
          <p className="forgot">Forgot password?</p>
        </div>
        <div className="background"></div>
      </div>
    </LoginWrapper>
  );

};

export default Login;
