import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  const { mutateAsync: register } = useMutation({
    mutationKey: ["register"],
    mutationFn: async () => {
      return axios.post(`${process.env.VITE_API_URL}/register`, {
        email,
        password,
      });
    },
  });

  const hasJWT = Cookies.get("token");
  if (hasJWT) {
    return <Navigate to="/" />;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== repeatPassword) {
      alert("Passwords do not match!");
      return;
    }
    return register().then(() => {
      return navigate("/login");
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <h1>Register</h1>
      <form
        onSubmit={handleSubmit}
        className="flex gap-4 flex-col border p-2 rounded"
      >
        <div className="flex-1 w-full justify-between flex ">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border"
            required
          />
        </div>
        <div className="flex-1 w-full justify-between flex ">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border"
            required
          />
        </div>
        <div className="flex-1 w-full justify-between flex ">
          <label>Repeat Password:</label>
          <input
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="border"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <NavLink to="/login">Login</NavLink>
      </p>
    </div>
  );
};

export default Register;
