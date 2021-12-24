import {useFormikContext} from "formik";
import React, {useEffect} from "react";
import phone from "../../assets/images/icons/account/phone.svg";

export const PhoneInput = ({name, value, handlePhone, readOnly, label, id, icons, placeholder, className}) => {
    const formikProps = useFormikContext()

    useEffect(() => {
        formikProps.setFieldValue("phone", value?.replace(/\D/g, ''))
    }, [value])

    return (
        <div className={`inputStyle ${className}`}>
            {label && <label htmlFor={id}>{label}</label>}
            {icons ? (
                <p className="withIcon">
                    <input
                        id={id}
                        type="text"
                        name={name}
                        placeholder={placeholder ?? ''}
                        value={value}
                        onChange={handlePhone}
                        readOnly={readOnly}
                    />
                    <span className="icon">
                        <img src={phone} alt="Phone"/>
                    </span>
                </p>
            ) : (
                    <input
                        // className={touched[field.name] && errors[field.name] && "error"}
                        id={id}
                        type="text"
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        onChange={handlePhone}
                        readOnly={readOnly}
                    />
                )}
                < /div>
                )
            }