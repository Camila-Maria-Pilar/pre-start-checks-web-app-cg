import React from 'react';

function Modal({ title, children, onClose }) {
  return (
    <div className="modal">
      <h2>{title}</h2>
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default Modal;
