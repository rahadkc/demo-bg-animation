import React, {Fragment, useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import angleLeft from "../../../assets/images/icons/angle-left.svg";
import angleRight from "../../../assets/images/icons/angle-right.svg";
import deleteIcon from "../../../assets/images/icons/list/delete.svg";
import editIcon from "../../../assets/images/icons/list/edit.svg";
import searchIcon from "../../../assets/images/icons/search.svg";
import {getShortContent} from "../../../utils/commonFunctions";
import {
  deleteInsuranceAction,
  getAdminInsuranceListAction,
} from "../dashboard/actions";
import "./style.scss";

const InsuranceList = (props) => {
  const [search, setSearch] = useState("");
  const [shot, setShot] = useState(25);
  const [selected, setSelected] = useState(0);

  const handleChange = (value) => {
    setSelected(value.selected);
    props.getAdminInsuranceListAction(`paginate=${shot}&page=${value.selected + 1}`);
    handleClickTop();
  };

  useEffect(() => {
    props.getAdminInsuranceListAction(`paginate=${shot}`);
  }, []);

  const handleClickTop = () => {
    window.scrollTo(0, 0);
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    props.getAdminInsuranceListAction(`search=${e.target.value}`);
  };

  const handleChangePaginate = (e) => {
    setShot(e.target.value);
    props.getAdminInsuranceListAction(`paginate=${e.target.value}`);
    handleClickTop();
  };

  const deleteResponseHandler = (slug) => {
    props.deleteInsuranceAction(slug);
  };

  return (
    <Fragment>
      <div className="blackListArea">
        <div className="adminContainer">
          <div className="d-flex flex-wrap align-items-center justify-content-between titleBoxWrap">
            <h2 className="adminSectionTitle">Insurances</h2>
            <ul className="d-flex flex-wrap align-items-center">

              <li>
                <Link
                  to="/admin/insurances/add-new-insurance"
                  className="adminBtn adminBtnBlack mt-sm-15"
                >
                  Add New Insurance
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
                placeholder="Search by Insurance Name or Plan"
              />
              <img src={searchIcon} alt="search"/>
            </p>
            {props?.insurances?.total > 0 && (
              <div className="shortingFilter">
                <select value={shot} onChange={handleChangePaginate}>
                  <option value="5">Showing 5</option>
                  <option value="10">Showing 10</option>
                  <option value="25">Showing 25</option>
                  <option value="50">Showing 50</option>
                </select>
                <span>out of {props?.insurances?.total}</span>
              </div>
            )}
          </div>
          <Fragment>
            <div className="tableResponsive">
              <table className="tableStyle">
                <thead>
                <tr>
                  <th>INSURANCE NAME</th>
                  <th>DESCRIPTION</th>
                  <th>STATUS</th>
                  <th/>
                </tr>
                </thead>
                <tbody className="tableBody">
                {props?.insurances?.data?.map((item, i) => (
                  <tr key={i}>
                    <td>
                      <strong>
                        <Link target="_blank" to={`/insurance/${item?.slug}`}>
                          {getShortContent(item?.name)}
                        </Link>
                      </strong>
                    </td>
                    <td>{item?.description}</td>
                    <td>
                      {item.status === "Publish" ? "Published" : item.status}
                    </td>
                    <td className="text-right">
                      <ul className="insuranceActionBtns">
                        <li>
                          <Link to={`/admin/insurances/${item.slug}`}>
                            <img src={editIcon} alt="edit"/>
                          </Link>
                        </li>

                        <li>
                          <button
                            onClick={() => deleteResponseHandler(item.slug)}
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
              {props.insurances?.total > props.insurances?.per_page && (
                <ReactPaginate
                  containerClassName="paginationWrapper"
                  pageCount={props.insurances.total / props.insurances.per_page}
                  pageRangeDisplayed={props.insurances.per_page}
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
                <span>out of {props.insurances?.total}</span>
              </div>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  insurances: state.admin.insurances,
});

export default connect(mapStateToProps, {
  getAdminInsuranceListAction,
  deleteInsuranceAction,
})(InsuranceList);
