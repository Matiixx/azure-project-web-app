import React from "react";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";

const Header: React.FC<{
  handleLogout: () => void;
}> = ({ handleLogout }) => {
  const isLoggedIn = Cookies.get("token");

  return (
    <header className="bg-blue-600 p-4 flex justify-between items-center w-full">
      <h1 className="text-white text-2xl">My Web App</h1>
      <div>
        {isLoggedIn ? (
          <div className="flex flex-row gap-4">
            <NavLink
              to="/add-book"
              className="bg-white text-black px-4 py-2 rounded"
            >
              Add books
            </NavLink>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-row gap-4">
            <NavLink
              to="/login"
              className="bg-green-500 text-white px-4 py-2 rounded hover:text-white hover:bg-green-700 transition-colors"
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className="bg-green-900 text-white px-4 py-2 rounded hover:text-white hover:bg-green-700 transition-colors"
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
