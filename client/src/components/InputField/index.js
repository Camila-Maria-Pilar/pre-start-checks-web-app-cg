import React from 'react';

function InputField({ label, name, onChange, value, type = 'text' }) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} value={value} onChange={onChange} />
    </div>
  );
}

export default InputField;
