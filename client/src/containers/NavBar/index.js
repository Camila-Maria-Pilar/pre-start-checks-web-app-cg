import React from 'react';
import { Link } from 'react-router-dom';


function NavBar() {
  return (
    <nav className="navbar">
      
      <Link to="/Dashboard">Dashboard</Link>
      <Link to="/Machines">Machines</Link>
      <Link to="/ListUsers">Users</Link>      
      <Link to="/Logout">Logout</Link>
    </nav>
  );
}

export default NavBar;


