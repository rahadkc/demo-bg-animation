import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
// import ReactPaginate from "react-paginate";
// import angleLeft from "../../../assets/images/icons/angle-left.svg";
// import angleRight from "../../../assets/images/icons/angle-right.svg";
import deleteIcon from "../../../assets/images/icons/list/delete.svg";
import editIcon from "../../../assets/images/icons/list/edit.svg";
import searchIcon from "../../../assets/images/icons/search.svg";
import { getShortContent } from "../../../utils/commonFunctions";
import {
  deletePlan,
  getPlansByInsuranceId,
} from "../dashboard/actions";
import "./style.scss";

const PlanList = (props) => {
  const [search, setSearch] = useState("");
  // const [shot, setShot] = useState(25);
  // const [selected, setSelected] = useState(0);

  const { insurance_id } = useParams();

  useEffect(() => {
    if (!insurance_id) {
      props.history.push("/admin/insurances");
    }
  }, []);

  useEffect(() => {
    props.getPlansByInsuranceId(insurance_id);
  }, []);

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    props.getPlansByInsuranceId(insurance_id, `?search=${e.target.value}`);
  };

  // const handleChange = (value) => {
  //   setSelected(value.selected);
  //   props.getPlansByInsuranceId(`paginate=${shot}&page=${value.selected + 1}`);
  // };

  // useEffect(() => {
  //   props.getPlansByInsuranceId(`paginate=${shot}`);
  // }, []);

  // const handleChangePaginate = (e) => {
  //   setShot(e.target.value);
  //   props.getPlansByInsuranceId(`paginate=${e.target.value}`);
  // };

  const deleteResponseHandler = (id, insurance_id) => {
    props.deletePlan(id, insurance_id);
  };

  return (
    <Fragment>
      <div className="blackListArea">
        <div className="adminContainer">
          <div className="d-flex flex-wrap align-items-center justify-content-between titleBoxWrap">
            <h2 className="adminSectionTitle">
              {props?.plans?.insurances?.name || "Plan name"}
            </h2>
            <ul className="d-flex flex-wrap align-items-center">
              <li className="mr-20">
                {/* <Link
                  to={`/admin/insurance/${insurance_id}/plan/${plan_id}/subscriptions`}
                  className="adminBtn mt-sm-15"
                >
                  Subscriptions
                </Link> */}
              </li>
              <li>
                <Link
                  to={`/admin/insurance/${insurance_id}/add-new-plan`}
                  className="adminBtn adminBtnBlack mt-sm-15"
                >
                  Add A Plan
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
                placeholder="Search by Plan Name or Insurance"
              />
              <img src={searchIcon} alt="search" />
            </p>
            {/* {props.resources_list?.total > 0 ? (
              <div className="shortingFilter">
                <select value={shot} onChange={handleChangePaginate}>
                  <option value="5">Showing 5</option>
                  <option value="10">Showing 10</option>
                  <option value="25">Showing 25</option>
                  <option value="50">Showing 50</option>
                </select>
                <span>out of {props.resources_list?.total}</span>
              </div>
            ) : (
              <span>0 Results</span>
            )} */}
          </div>
          <Fragment>
            <div className="tableResponsive">
              <table className="tableStyle">
                <thead>
                  <tr>
                    <th>PLAN NAME</th>
                    <th className="col-description">DESCRIPTION</th>
                    <th>STATUS</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="tableBody">
                  {props?.plans?.insurances?.plans.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <strong>
                          <Link
                            to={`/resources/${
                              item.id
                            }/${item.url?.toLowerCase()}`}
                          >
                            {getShortContent(item?.title)}
                          </Link>
                        </strong>
                      </td>
                      <td>{item.description || "__"}</td>
                      <td>{item.status === 1 ? "Active" : "Inactive"}</td>
                      <td className="text-right">
                        <ul className="insuranceActionBtns justify-between">
                          <li>
                            <Link
                              to={`/admin/insurance/${insurance_id}/plan/${item.id}/subscriptions`}
                              className="view-items"
                            >
                              View Subscriptions
                            </Link>
                          </li>

                          <li>
                            <Link
                              to={`/admin/insurance/${insurance_id}/plan/${item.id}/update`}
                            >
                              <img src={editIcon} alt="edit" />
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={() =>
                                deleteResponseHandler(item.id, insurance_id)
                              }
                              className="remove"
                            >
                              <img src={deleteIcon} alt="delete" />
                            </button>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  plans: state.admin.plans,
});

export default connect(mapStateToProps, {
  getPlansByInsuranceId,
  deletePlan,
})(PlanList);
