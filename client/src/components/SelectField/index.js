import React from 'react';

function SelectField({ label, name, options, onChange, value }) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} onChange={onChange} value={value}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
