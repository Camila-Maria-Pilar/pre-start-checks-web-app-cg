import React from 'react';


function Card({ title, children }) {
  return (
    <div className="custom-card">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

export default Card;
