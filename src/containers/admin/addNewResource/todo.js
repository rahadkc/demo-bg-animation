import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategoriesListAction } from "../../admin/dashboard/actions";

const SelectTodo = ({
  addTask,
  placeholder,
  getCategoriesListAction,
  categories,
  categoriesData,
}) => {
  const [value, setValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const newCategories = categories?.data?.map((item) => item.name);
  const newArray = newCategories?.filter(
    (item) => !categoriesData?.includes(item)
  );
  useEffect(() => {
    getCategoriesListAction();
  }, []);
  const handleSubmit = (value) => {
    value && addTask(value);
    setShowDropdown(false);
  };

  const handleChange = (e) => {
    getCategoriesListAction(`search=${e.target.value}`);
    setValue(e.target.value);
  };
  return (
    <div className="selectTodoWrap">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setShowDropdown(false)}
      />
      <ul className={showDropdown ? "active selectTodoList" : "selectTodoList"}>
        {newArray?.map((item) => (
          <li onClick={() => handleSubmit(item)} key={item} value={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.admin.categories,
});

export default connect(mapStateToProps, {
  getCategoriesListAction,
})(SelectTodo);
