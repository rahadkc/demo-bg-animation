import React from "react";

const SelectField = ({
  field,
  label,
  name,
  id,
  value,
  className = "",
  children,
  form: { touched, errors },
  ...props
}) => {
  return (
    <div className={`inputStyle ${className}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        className={touched[field.name] && errors[field.name] && "error"}
        id={id}
        {...field}
        {...props}
      >
        {children}
      </select>
      {touched[field.name] && errors[field.name] && (
        <div className="errorMessage">{errors[field.name]}</div>
      )}
    </div>
  );
};

export default SelectField;
