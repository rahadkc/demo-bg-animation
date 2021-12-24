import React, {Fragment, useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import angleLeft from "../../../assets/images/icons/angle-left.svg";
import angleRight from "../../../assets/images/icons/angle-right.svg";
import deleteIcon from "../../../assets/images/icons/list/delete.svg";
import editIcon from "../../../assets/images/icons/list/edit.svg";
import viewIcon from "../../../assets/images/icons/list/view.svg";
import searchIcon from "../../../assets/images/icons/search.svg";
import sortAscIcon from "../../../assets/images/icons/sort-asc.svg";
import sortDescIcon from "../../../assets/images/icons/sort-desc.svg";
import {
  getShortContent,
  translateToString,
} from "../../../utils/commonFunctions";
import {
  deleteResourceAction,
  getResourceListAction
} from "../dashboard/actions";
import "./style.scss";

const ResourceList = (props) => {
  const [search, setSearch] = useState("");
  const [shot, setShot] = useState(25);
  const [selected, setSelected] = useState(0);
  const [sortOrder, setSortOrder] = useState('display_type_asc')

  const handleChange = (value) => {
    setSelected(value.selected);
    props.getResourceListAction(`order=${sortOrder}&paginate=${shot}&page=${value.selected + 1}`);
    handleClickTop();
  };

  const changeSortOrder = () => {
    if (sortOrder === 'display_type_asc') {
      setSortOrder('display_type_desc')
    } else {
      setSortOrder('display_type_asc')
    }
  }

  useEffect(() => {
    props.getResourceListAction(`order=${sortOrder}&paginate=${shot}`);
  }, [sortOrder])

  const handleClickTop = () => {
    window.scrollTo(0, 0);
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    props.getResourceListAction(`order=${sortOrder}&search=${e.target.value}`);
  };

  const handleChangePaginate = (e) => {
    setShot(e.target.value);
    props.getResourceListAction(`order=${sortOrder}&paginate=${e.target.value}`);
    handleClickTop();
  };

  const deleteResponseHandler = (id) => {
    props.deleteResourceAction(id);
  };

  return (
    <Fragment>
      <div className="blackListArea">
        <div className="adminContainer">
          <div className="d-flex flex-wrap align-items-center justify-content-between titleBoxWrap">
            <h2 className="adminSectionTitle">Resources</h2>
            <ul className="d-flex flex-wrap align-items-center">
              <li className="mr-20">
                <Link to="/admin/categories" className="adminBtn mt-sm-15">
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/add-new-resource"
                  className="adminBtn adminBtnBlack mt-sm-15"
                >
                  Add New Resources
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-flex flex-wrap align-items-center justify-content-between searchBoxWrap">
            <p className="searchList">
              <input
                type="text"
                value={search}
                onChange={handleChangeSearch}
                placeholder="Search by Resource Name or Category"
              />
              <img src={searchIcon} alt="search"/>
            </p>
            {props.resources_list?.total > 0 && (
              <div className="shortingFilter">
                <select value={shot} onChange={handleChangePaginate}>
                  <option value="5">Showing 5</option>
                  <option value="10">Showing 10</option>
                  <option value="25">Showing 25</option>
                  <option value="50">Showing 50</option>
                </select>
                <span>out of {props.resources_list?.total}</span>
              </div>
            )}
          </div>
          <Fragment>
            <div className="tableResponsive">
              <table className="tableStyle">
                <thead>
                <tr>
                  <th>RESOURCE NAME</th>
                  <th>STATUS</th>
                  <th>TYPE</th>
                  <th>CATEGORIES</th>
                  <th className='sort-icon-column' onClick={changeSortOrder}>
                    DISPLAY TYPE
                    {
                      sortOrder === 'display_type_asc' ? (
                        <img className='sort-icon' src={sortAscIcon} alt="SORT ASC"/>
                      ) : (
                        <img className='sort-icon' src={sortDescIcon} alt="SORT DESC"/>
                      )
                    }
                  </th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                {props.resources_list?.data?.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>
                        <Link
                          to={`/resources/${
                            item.id
                          }/${item.url?.toLowerCase()}`}
                        >
                          {getShortContent(item?.name)}
                        </Link>
                      </strong>
                    </td>
                    <td>
                      {(item.status === "Draft" && "Draft") ||
                      (item.status === "Publish" && "Published") ||
                      (item.status === "Later" && "Later")}
                    </td>
                    <td>
                      {(item.resource_type === "how-to-guides" &&
                        "How To Guides") ||
                      (item.resource_type === "spreadsheets" &&
                        "Spreadsheets") ||
                      (item.resource_type === "calculators-tools" &&
                        "Calculators + Tools") ||
                      (item.resource_type === "videos" &&
                        "How To Guides") ||
                      (item.resource_type === "audio-program" &&
                        "Audio Program")}
                    </td>
                    <td>
                      {" "}
                      {item.categories?.split(",").map((item) => (
                        <span className="category" key={item}>
                            {item} <span className="comma">{","}</span>
                          </span>
                      ))}
                    </td>
                    <td>
                      {item.display_type}
                    </td>
                    <td className="text-right">
                      <ul className="actionBtns">
                        {item.status !== "Draft" ? (
                          <li>
                            <Link
                              to={`/resources/${
                                item.id
                              }/${item.url?.toLowerCase()}`}
                            >
                              <img src={viewIcon} alt="view"/>
                            </Link>
                          </li>
                        ) : null}

                        <li>
                          <Link
                            to={`/admin/resources/${
                              item.id
                            }/${translateToString(item.name?.toLowerCase())}`}
                          >
                            <img src={editIcon} alt="edit"/>
                          </Link>
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
              {props.resources_list?.total > props.resources_list?.per_page && (
                <ReactPaginate
                  containerClassName="paginationWrapper"
                  pageCount={
                    props.resources_list.total / props.resources_list.per_page
                  }
                  pageRangeDisplayed={props.resources_list.per_page}
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
                <span>out of {props.resources_list?.total}</span>
              </div>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  resources_list: state.admin.resources_list,
});

export default connect(mapStateToProps, {
  getResourceListAction,
  deleteResourceAction,
})(ResourceList);
