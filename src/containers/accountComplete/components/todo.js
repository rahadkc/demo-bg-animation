import React, { useState } from "react";
import plus from "../../../assets/images/icons/resources/plus.svg";

const AddTaskForm = ({ addTask, placeholder }) => {
  const [value, setValue] = useState("");
  const handleSubmit = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      value && addTask(value);
      setValue("");
    }
  };

  const handleClickSubmit = (event) => {
    event.preventDefault();
    value.split(",").forEach((item) => {
      addTask(item);
    });

    setValue("");
  };

  return (
    <div className="todoInput">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value.replace(/@/g, ""))}
        onKeyUp={handleSubmit}
      />
      <span onClick={handleClickSubmit} className="plusBtn">
        <img src={plus} alt="plus" />
      </span>
    </div>
  );
};

export default AddTaskForm;
