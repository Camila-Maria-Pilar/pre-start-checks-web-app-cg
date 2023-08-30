import React from 'react';
import { Link } from 'react-router-dom';


function NavBar() {
  return (
    <nav className="navbar">
      
      <Link style={{marginRight: 10}} to="/Dashboard">Dashboard</Link>
      <Link style={{marginRight: 10}} to="/Machines">List Machine</Link>
      <Link style={{marginRight: 10}} to="/AddMachine">AddMachine</Link>
      <Link style={{marginRight: 10}} to="/AddUser">AddUser</Link>
      <Link style={{marginRight: 10}} to="/AddQuestionnaire">AddQuestionnaire</Link>
      <Link style={{marginRight: 10}} to="/PrecheckLogForm">PrecheckLogForm</Link>
      <Link style={{marginRight: 10}} to="/Logout">Logout</Link>
      
    </nav>
  );
}

export default NavBar;

