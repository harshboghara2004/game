/*
import React from 'react';
import './Header.css'; // Import the CSS for styling

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">Korgi Games</h1>
    </header>
  );
};

export default Header;*/
/*
import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // ✅ Import Home Icon
import "./Header.css"; // ✅ Ensure you have this CSS file

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="home-icon">
        <FaHome size={18} /> {/* ✅ Properly sized Home Icon *
      </Link>
      <h1 className="header-title">Korgi Games</h1>
    </header>
  );
};

export default Header;*/

import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // ✅ Import Home Icon
import "./Header.css"; // ✅ Ensure you have this CSS file

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="home-icon">
        <FaHome size={18} /> {/* ✅ Properly sized Home Icon */}
      </Link>
      <h1 className="header-title">Korgi Games</h1>
    </header>
  );
};

export default Header;