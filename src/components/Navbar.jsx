import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🎬 Movie Explorer
      </Link>

      <span className="nav-text">
        Discover Your Next Favourite Movie
      </span>
    </nav>
  );
}

export default Navbar;