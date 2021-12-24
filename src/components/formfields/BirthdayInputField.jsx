import React, { Fragment } from "react";

const BirthdayTextInput = ({
  field,
  label,
  name,
  id,
  value,
  multiline,
  className = "",
  icons,
  form: { touched, errors },
  iconHideOnDateSelect,
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
            <p className="withIcon asdf">
              <input
                className={touched[field.name] && errors[field.name] && "error"}
                id={id}
                type="text"
                style={{
                  cursor: "pointer",
                  background: "transparent",
                  position: "relative",
                  zIndex: 3,
                }}
                {...field}
                {...props}
              />
              {
                showPassHandler ? (
                  <span
                    onClick={showPassHandler}
                    style={{ cursor: "pointer" }}
                    className="icon password_icon"
                  >
                    <img src={icons} alt={label} />
                  </span>
                ) : // {
                iconHideOnDateSelect == "" ? (
                  <span className="icon">
                    <img src={icons} alt={label} />
                  </span>
                ) : (
                  ""
                )
                // }
              }
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

export default BirthdayTextInput;
