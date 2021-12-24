import React, {Fragment, useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import angleLeft from "../../../assets/images/icons/angle-left.svg";
import angleRight from "../../../assets/images/icons/angle-right.svg";
import deleteIcon from "../../../assets/images/icons/list/delete.svg";
import editIcon from "../../../assets/images/icons/list/edit.svg";
import searchIcon from "../../../assets/images/icons/search.svg";
import {translateToString} from "../../../utils/commonFunctions";
import {
  deleteFeatureAction,
  getFeatureListAction,
} from "../dashboard/actions";
import "./style.scss";

const UpcomingFeature = (props) => {
  const [search, setSearch] = useState("");
  const [shot, setShot] = useState(15);
  const [selected, setSelected] = useState(0);

  const handleChange = (value) => {
    setSelected(value.selected);
    props.getFeatureListAction(`paginate=${shot}&page=${value.selected + 1}`);
    handleClickTop();
  };

  useEffect(() => {
    props.getFeatureListAction(`paginate=${shot}`);
  }, []);

  const handleClickTop = () => {
    window.scrollTo(0, 0);
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    props.getFeatureListAction(`search=${e.target.value}`);
  };

  const handleChangePaginate = (e) => {
    setShot(e.target.value);
    props.getFeatureListAction(`paginate=${e.target.value}`);
    handleClickTop();
  };

  const handleDelete = (id) => {
    props.deleteFeatureAction(id);
  };

  return (
    <Fragment>
      <div className="blackListArea">
        <div className="adminContainer">
          <div className="d-flex flex-wrap align-items-center justify-content-between titleBoxWrap">
            <h2 className="adminSectionTitle">Upcoming Features</h2>
            <Link to="/admin/add-feature" className="adminBtn adminBtnBlack">
              Add A Feature
            </Link>
          </div>
          <div className="d-flex flex-wrap align-items-center justify-content-between searchBoxWrap">
            <p className="searchList">
              <input
                type="text"
                value={search}
                onChange={handleChangeSearch}
                placeholder="Search by Feature Name"
              />
              <img src={searchIcon} alt="search"/>
            </p>
            {props.feature?.total > 0 ? (
              <div className="shortingFilter">
                <select value={shot} onChange={handleChangePaginate}>
                  <option value="5">Showing 5</option>
                  <option value="10">Showing 10</option>
                  <option value="25">Showing 25</option>
                  <option value="50">Showing 50</option>
                </select>
                <span>out of {props.feature?.total}</span>
              </div>
            ) : (
              <span>0 Results</span>
            )}
          </div>
          {props.feature?.total > 0 ? (
            <Fragment>
              <div className="tableResponsive">
                <table className="tableStyle">
                  <thead>
                  <tr>
                    <th>Feature Name</th>
                    <th>UpVOTES</th>
                    <th>DownVOTES</th>
                    <th>COMING IN</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  {props.feature?.data?.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <strong>{item.name}</strong>
                      </td>
                      <td>{item.up_vote}</td>
                      <td>{item.down_vote}</td>
                      <td>{item.coming_in}</td>
                      <td className="text-right">
                        <ul className="actionBtns">
                          <li>
                            <Link
                              to={`/admin/upcoming-features/${
                                item.id
                              }/${translateToString(
                                item.name?.toLowerCase()
                              )}`}
                            >
                              <img src={editIcon} alt="edit"/>
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={() => handleDelete(item.id)}
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
                {props.feature?.total > props.feature?.per_page && (
                  <ReactPaginate
                    containerClassName="paginationWrapper"
                    pageCount={props.feature.total / props.feature.per_page}
                    pageRangeDisplayed={props.feature.per_page}
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
                  <span>out of {props.feature?.total}</span>
                </div>
              </div>
            </Fragment>
          ) : (
            <div className="noResultTable">
              <span>We’re Sorry, NO RESULTS COULD BE FOUND</span>
              <button>Keep Searching</button>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  feature: state.admin.feature,
});

export default connect(mapStateToProps, {
  getFeatureListAction,
  deleteFeatureAction,
})(UpcomingFeature);
