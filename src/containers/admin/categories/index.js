import {Field, Form, Formik} from "formik";
import moment from "moment";
import React, {Fragment, useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {connect} from "react-redux";
import {Modal} from "reactstrap";
import * as Yup from "yup";
import angleLeft from "../../../assets/images/icons/angle-left.svg";
import angleRight from "../../../assets/images/icons/angle-right.svg";
import cancel from "../../../assets/images/icons/cancel.svg";
import crose from "../../../assets/images/icons/crose.svg";
import deleteIcon from "../../../assets/images/icons/list/delete.svg";
import editIcon from "../../../assets/images/icons/list/edit.svg";
import searchIcon from "../../../assets/images/icons/search.svg";
import submit from "../../../assets/images/icons/submit.svg";
import TextInput from "../../../components/formfields/InputField";
import ThumbImg from "../../../components/formfields/uploadImage";
import {
  addNewCategoryAction,
  deleteCategoryAction,
  getCategoriesListAction,
  updateCategoryAction,
} from "../dashboard/actions";
import "./style.scss";

const validationSchema = Yup.object({
  name: Yup.string().required("Name can not be empty"),
  icon: Yup.string().required("Icon can not be empty"),
  hover_icon: Yup.string().required("Color icon can not be empty"),
});

const Categories = (props) => {
  const [search, setSearch] = useState("");
  const [shot, setShot] = useState(25);
  const [selected, setSelected] = useState(0);
  const [addNewModal, setAddNewModal] = useState(false);
  const [editNewModal, setEditNewModal] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [editColorImage, setEditColorImage] = useState(false);

  const [editContent, setEditContent] = useState({
    name: "",
    icon: "",
    id: "",
    hover_icon: "",
  });

  const initialState = {
    name: "",
    icon: "",
    hover_icon: "",
  };

  const editInitialState = {
    name: editContent.name,
    id: editContent.id,
    hover_icon: "",
    icon: "",
  };

  const handleChange = (value) => {
    setSelected(value.selected);
    props.getCategoriesListAction(
      `paginate=${shot}&page=${value.selected + 1}`
    );
    handleClickTop();
  };

  useEffect(() => {
    props.getCategoriesListAction(`paginate=${shot}`);
  }, []);

  const handleClickTop = () => {
    window.scrollTo(0, 0);
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    props.getCategoriesListAction(`search=${e.target.value}`);
  };

  const handleChangePaginate = (e) => {
    setShot(e.target.value);
    props.getCategoriesListAction(`paginate=${e.target.value}`);
    handleClickTop();
  };

  const deleteResponseHandler = (id) => {
    props.deleteCategoryAction(id);
  };

  const handleAddModal = () => {
    setAddNewModal(true);
  };
  const submitHandler = (values, actions) => {
    const form_data = new FormData();
    form_data.append("name", values.name);
    form_data.append("icon", values.icon);
    form_data.append("hover_icon", values.hover_icon);
    props.addNewCategoryAction(form_data, actions, setAddNewModal);
  };

  const editModalOpen = (name, icon, hover_icon, id) => {
    setEditNewModal(true);
    setEditContent({
      name: name,
      icon: icon,
      hover_icon: hover_icon,
      id: id,
    });
  };
  const editSubmitHandler = (values, actions) => {
    const form_data = new FormData();
    form_data.append("name", values.name);
    form_data.append("icon", values.icon);
    form_data.append("hover_icon", values.hover_icon);
    props.updateCategoryAction(
      form_data,
      actions,
      setEditNewModal,
      editContent.id
    );
  };

  return (
    <Fragment>
      <div className="blackListArea">
        <div className="adminContainer">
          <div className="d-flex flex-wrap align-items-center justify-content-between titleBoxWrap">
            <h2 className="adminSectionTitle">Categories</h2>
            <button onClick={handleAddModal} className="adminBtn adminBtnBlack">
              Add new Category
            </button>
          </div>
          <div className="d-flex flex-wrap align-items-center justify-content-between searchBoxWrap">
            <p className="searchList">
              <input
                type="text"
                value={search}
                onChange={handleChangeSearch}
                placeholder="Search by Category Name"
              />
              <img src={searchIcon} alt="search"/>
            </p>
            {props.categories?.total > 0 ? (
              <div className="shortingFilter">
                <select value={shot} onChange={handleChangePaginate}>
                  <option value="5">Showing 5</option>
                  <option value="10">Showing 10</option>
                  <option value="25">Showing 25</option>
                  <option value="50">Showing 50</option>
                </select>
                <span>out of {props.categories?.total}</span>
              </div>
            ) : (
              <span>0 Results</span>
            )}
          </div>
          <Fragment>
            <div className="tableResponsive">
              <table className="tableStyle">
                <thead>
                <tr>
                  <th>Icons</th>
                  <th>Hover Icons</th>
                  <th>Category NAME</th>
                  <th>created at</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                {props.categories?.data?.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.icon} alt={item.name} className="categoryIcon"/>
                    </td>
                    <td>
                      <img src={item.hover_icon} alt={item.name} className="categoryIcon"/>
                    </td>
                    <td>{item.name}</td>
                    <td>{moment(item.created_at).format("DD MMMM YYYY")}</td>
                    <td className="text-right">
                      <ul className="actionBtns">
                        <li>
                            <span
                              onClick={() =>
                                editModalOpen(
                                  item.name,
                                  item.icon,
                                  item.hover_icon,
                                  item.id
                                )
                              }
                            >
                              <img src={editIcon} alt="edit"/>
                            </span>
                        </li>
                        <li>
                          <button
                            onClick={() => deleteResponseHandler(item.id)}
                            className="remove"
                          >
                            <img src={deleteIcon} alt="delete"/>
                          </button>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex flex-wrap justify-content-between align-items-center">
              {props.categories?.total > props.categories?.per_page && (
                <ReactPaginate
                  containerClassName="paginationWrapper"
                  pageCount={props.categories.total / props.categories.per_page}
                  pageRangeDisplayed={props.categories.per_page}
                  onPageChange={handleChange}
                  nextLabel={<img src={angleRight} alt="right"/>}
                  previousLabel={<img src={angleLeft} alt="left"/>}
                  forcePage={selected}
                />
              )}
              <div className="shortingFilter">
                <select value={shot} onChange={handleChangePaginate}>
                  <option value="5">Showing 5</option>
                  <option value="10">Showing 10</option>
                  <option value="25">Showing 25</option>
                  <option value="50">Showing 50</option>
                </select>
                <span>out of {props.categories?.total}</span>
              </div>
            </div>
          </Fragment>
        </div>
      </div>

      <Modal
        isOpen={addNewModal}
        centered
        fade={false}
        onClosed={() => setAddNewModal(false)}
        backdropClassName="signupModalWrapBackdrop"
        className="blackListModal"
      >
        <span onClick={() => setAddNewModal(false)} className="signupCroseBtn">
          <img src={crose} alt="crose"/>
        </span>
        <div className="blackListModalWrap">
          <h2>Add New Category</h2>
          <Formik
            enableReinitialize
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={submitHandler}
          >
            {({
                values,
                handleChange,
                handleBlur,
                setFieldValue,
                touched,
                errors,
              }) => {
              return (
                <Form className="usefulFeatureForm">
                  <div className="usefulFeatureFormBG">
                    <Field
                      label="Name"
                      name="name"
                      component={TextInput}
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Name"
                      className="editField"
                    />

                    <label className="imageLabel" htmlFor="image">
                      Back Icon
                    </label>
                    <div className="uploadImage uploadIcons mb-30">
                      {values.icon ? (
                        <div className="fileImage">
                          <ThumbImg defaultImg={false} file={values.icon}/>
                          <button
                            onClick={() => setFieldValue("icon", "")}
                            className="deleteIcon"
                          >
                            <img src={deleteIcon} alt="delete"/>
                          </button>
                        </div>
                      ) : (
                        <button component="label" className="inputFileBtn">
                          <h5>Upload File</h5>
                          <span className="fileText">(jpg, png, gif)</span>
                          <span className="fileBtn">Add Item</span>
                          <input
                            id="icon"
                            name="icon"
                            type="file"
                            onChange={(event) => {
                              setFieldValue(
                                "icon",
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                        </button>
                      )}
                      {touched.icon && errors.icon && (
                        <p className="errorMsg mb-0">{errors.icon}</p>
                      )}
                    </div>
                    <label className="imageLabel" htmlFor="hover_icon">
                      Color Icon
                    </label>
                    <div className="uploadImage uploadIcons mb-30">
                      {values.hover_icon ? (
                        <div className="fileImage">
                          <ThumbImg
                            defaultImg={false}
                            file={values.hover_icon}
                          />
                          <button
                            onClick={() => setFieldValue("icon", "")}
                            className="deleteIcon"
                          >
                            <img src={deleteIcon} alt="delete"/>
                          </button>
                        </div>
                      ) : (
                        <button component="label" className="inputFileBtn">
                          <h5>Upload File</h5>
                          <span className="fileText">(jpg, png, gif)</span>
                          <span className="fileBtn">Add Item</span>
                          <input
                            id="hover_icon"
                            name="hover_icon"
                            type="file"
                            onChange={(event) => {
                              setFieldValue(
                                "hover_icon",
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                        </button>
                      )}
                      {touched.hover_icon && errors.hover_icon && (
                        <p className="errorMsg mb-0">{errors.hover_icon}</p>
                      )}
                    </div>
                  </div>
                  <ul className="modalBtns">
                    <li>
                      <button type="submit" className="success">
                        Add New <img src={submit} alt="submit"/>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setAddNewModal(false)}
                        type="button"
                        className="error"
                      >
                        No, Don’t Do It <img src={cancel} alt="submit"/>
                      </button>
                    </li>
                  </ul>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Modal>
      <Modal
        isOpen={editNewModal}
        centered
        fade={false}
        onClosed={() => setEditNewModal(false)}
        backdropClassName="signupModalWrapBackdrop"
        className="blackListModal"
      >
        <span onClick={() => setEditNewModal(false)} className="signupCroseBtn">
          <img src={crose} alt="crose"/>
        </span>
        <div className="blackListModalWrap">
          <h2>Edit Category</h2>
          <Formik
            enableReinitialize
            initialValues={editInitialState}
            onSubmit={editSubmitHandler}
          >
            {({values, handleChange, handleBlur, setFieldValue}) => {
              return (
                <Form className="usefulFeatureForm">
                  <div className="usefulFeatureFormBG">
                    <Field
                      label="Name"
                      name="name"
                      component={TextInput}
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Name"
                      className="editField"
                    />

                    <label className="imageLabel" htmlFor="image">
                      Black icon
                    </label>
                    <div className="uploadImage mb-30 uploadIcons">
                      {!editImage ? (
                        <div className="fileImage">
                          <img src={editContent.icon} alt="imagesss"/>
                          <button
                            onClick={() => setEditImage(true)}
                            className="deleteIcon"
                            type="button"
                          >
                            <img src={deleteIcon} alt="delete"/>
                          </button>
                        </div>
                      ) : (
                        <Fragment>
                          {values.icon ? (
                            <div className="fileImage">
                              <ThumbImg defaultImg={false} file={values.icon}/>

                              <button
                                onClick={() => setFieldValue("icon", "")}
                                className="deleteIcon"
                                type="button"
                              >
                                <img src={deleteIcon} alt="delete"/>
                              </button>
                            </div>
                          ) : (
                            <button
                              component="label"
                              className="inputFileBtn"
                              type="button"
                            >
                              <h5>Upload File</h5>
                              <span className="fileText">(jpg, png, gif)</span>
                              <span className="fileBtn">Add Item</span>
                              <input
                                id="icon"
                                name="icon"
                                type="file"
                                onChange={(event) => {
                                  setFieldValue(
                                    "icon",
                                    event.currentTarget.files[0]
                                  );
                                }}
                              />
                            </button>
                          )}
                        </Fragment>
                      )}
                    </div>
                    <label className="imageLabel" htmlFor="hover_icon">
                      Color Icon
                    </label>
                    <div className="uploadImage mb-0 uploadIcons">
                      {!editColorImage ? (
                        <div className="fileImage">
                          <img src={editContent.hover_icon} alt="imagesss"/>
                          <button
                            onClick={() => setEditColorImage(true)}
                            className="deleteIcon"
                            type="button"
                          >
                            <img src={deleteIcon} alt="delete"/>
                          </button>
                        </div>
                      ) : (
                        <Fragment>
                          {values.hover_icon ? (
                            <div className="fileImage">
                              <ThumbImg
                                defaultImg={false}
                                file={values.hover_icon}
                              />

                              <button
                                onClick={() => setFieldValue("hover_icon", "")}
                                className="deleteIcon"
                                type="button"
                              >
                                <img src={deleteIcon} alt="delete"/>
                              </button>
                            </div>
                          ) : (
                            <button
                              component="label"
                              className="inputFileBtn"
                              type="button"
                            >
                              <h5>Upload File</h5>
                              <span className="fileText">(jpg, png, gif)</span>
                              <span className="fileBtn">Add Item</span>
                              <input
                                id="hover_icon"
                                name="hover_icon"
                                type="file"
                                onChange={(event) => {
                                  setFieldValue(
                                    "hover_icon",
                                    event.currentTarget.files[0]
                                  );
                                }}
                              />
                            </button>
                          )}
                        </Fragment>
                      )}
                    </div>
                  </div>
                  <ul className="modalBtns">
                    <li>
                      <button type="submit" className="success">
                        Update <img src={submit} alt="submit"/>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setAddNewModal(false)}
                        type="button"
                        className="error"
                      >
                        No, Don’t Do It <img src={cancel} alt="submit"/>
                      </button>
                    </li>
                  </ul>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  categories: state.admin.categories,
});

export default connect(mapStateToProps, {
  getCategoriesListAction,
  deleteCategoryAction,
  addNewCategoryAction,
  updateCategoryAction,
})(Categories);
