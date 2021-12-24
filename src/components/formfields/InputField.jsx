import React, { Fragment } from "react";

const TextInput = ({
  field,
  label,
  name,
  id,
  value,
  multiline,
  className = "",
  icons,
  form: { touched, errors },
  showPassHandler,
  ...props
}) => {
  return (
    <div className={`inputStyle ${className} `}>
      {label && <label htmlFor={id}>{label}</label>}
      {multiline ? (
        <textarea
          className={touched[field.name] && errors[field.name] && "error"}
          id={id}
          {...field}
          {...props}
        ></textarea>
      ) : (
        <Fragment>
          {icons ? (
            <p className="withIcon">
              <input
                className={touched[field.name] && errors[field.name] && "error"}
                id={id}
                type="text"
                {...field}
                {...props}
              />
              {showPassHandler ? (
                <span
                  onClick={showPassHandler}
                  style={{ cursor: "pointer" }}
                  className="icon password_icon"
                >
                  <img src={icons} alt={label} />
                </span>
              ) : (
                <span className="icon">
                  <img src={icons} alt={label} />
                </span>
              )}
            </p>
          ) : (
            <input
              className={touched[field.name] && errors[field.name] && "error"}
              id={id}
              type="text"
              {...field}
              {...props}
            />
          )}
        </Fragment>
      )}

      {touched[field.name] && errors[field.name] && (
        <div className="errorMessage">{errors[field.name]}</div>
      )}
    </div>
  );
};

export default TextInput;
