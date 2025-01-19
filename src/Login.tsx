import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { mutateAsync: login } = useMutation({
    mutationKey: ["login"],
    mutationFn: async () => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          email,
          password,
        }
      );
      return response.data.token;
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    return login().then((token) => {
      Cookies.set("token", token, {
        expires: 30,
        secure: true,
        sameSite: "strict",
      });
      return navigate("/");
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <h1>Login</h1>
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
            required
            className="border"
          />
        </div>
        <div className="flex-1 w-full justify-between flex ">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <NavLink to="/register">Register</NavLink>
      </p>
    </div>
  );
};

export default Login;
