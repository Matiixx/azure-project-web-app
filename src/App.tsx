import { useState } from "react";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { NavLink, useNavigate } from "react-router-dom";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { logOut } from "./utils";

function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const isLoggedIn = Cookies.get("token");

  const x = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await axios.get(
        "https://inhibitorwychwytuzwrotnegoserotoniny.azurewebsites.net/"
      );
      const data = await response.data;
      return data;
    },
  });
  console.log(x.data);

  const handleLogout = () => {
    logOut();
    navigate("/login");
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
      {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
    </>
  );
}

export default App;
