import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar">
      
      <Link style={{marginRight: 16}} to="/dashboard">Dashboard</Link>
      <Link style={{marginRight: 16}} to="/machines">List Machine</Link>
      <Link style={{marginRight: 16}} to="/AddMachine">AddMachine</Link>
      <Link style={{marginRight: 16}} to="/AddUser">AddUser</Link>
      <Link style={{marginRight: 16}} to="/Addquestionnaire">Addquestionnaire</Link>
      <Link style={{marginRight: 16}} to="/Logout">Logout</Link>
      {/* Add more links as needed */}
    </nav>
  );
}

export default NavBar;

