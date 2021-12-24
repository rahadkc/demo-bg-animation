import React, {Fragment, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {connect} from "react-redux";
import deleteIcon from "../../../assets/images/icons/list/delete.svg";
import editIcon from "../../../assets/images/icons/list/edit.svg";
import searchIcon from "../../../assets/images/icons/search.svg";
import {
  getShortContent,
} from "../../../utils/commonFunctions";
import {
  deleteSubscription,
  getSubscriptionListByPlanId,
} from "../dashboard/actions";
import "./style.scss";

const SubscriptionList = (props) => {
  const [search, setSearch] = useState("");
  const {insurance_id, plan_id} = useParams();

  useEffect(() => {
    if (!insurance_id || !plan_id || isNaN(plan_id)) {
      props.history.push("/admin/insurance/plans");
    }
  }, []);

  useEffect(() => {
    props.getSubscriptionListByPlanId(plan_id);
  }, []);

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    props.getSubscriptionListByPlanId(plan_id, `?search=${e.target.value}`);
  };

  const deleteResponseHandler = (id) => {
    props.deleteSubscription(id, plan_id);
  };

  return (
    <Fragment>
      <div className="blackListArea">
        <div className="adminContainer">
          <div className="d-flex flex-wrap align-items-center justify-content-between titleBoxWrap">
            <h2 className="adminSectionTitle">
              {props?.subscriptions?.plan?.title || 'Subscription Title'}
            </h2>
            <ul className="d-flex flex-wrap align-items-center">
              <li className="mr-20"></li>
              <li>
                <Link
                  to={`/admin/insurance/${insurance_id}/plan/${plan_id}/subscription/add-new-subscription`}
                  className="adminBtn adminBtnBlack mt-sm-15"
                >
                  Add New Subscription
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
                  <th>SUBSCRIPTION NAME</th>
                  <th>PRICE</th>
                  <th>AVAILABLE IN</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                {props?.subscriptions?.plan?.subscriptions?.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>
                        <Link to={`/resources/${item.id}`}>
                          {getShortContent(item?.title)}
                        </Link>
                      </strong>
                    </td>
                    <td>{item.price}</td>
                    <td>{item.available_in || "__"}</td>

                    <td className="text-right">
                      <ul className="insuranceActionBtns">
                        {/* {item.status !== "Draft" ? ( */}
                        <li></li>
                        {/* <li>
                            <Link
                              to={`/resources/${
                                item.id
                              }/${item.url?.toLowerCase()}`}
                            >
                              <img src={viewIcon} alt="view" />
                            </Link>
                          </li> */}
                        {/* ) : null} */}

                        <li>
                          <Link
                            to={`/admin/insurance/${insurance_id}/plan/${plan_id}/subscription/${item.id}/update`}
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
            {/* <div className="d-flex flex-wrap justify-content-between align-items-center">
              {props.resources_list?.total > props.resources_list?.per_page && (
                <ReactPaginate
                  containerClassName="paginationWrapper"
                  pageCount={
                    props.resources_list.total / props.resources_list.per_page
                  }
                  pageRangeDisplayed={props.resources_list.per_page}
                  onPageChange={handleChange}
                  nextLabel={<img src={angleRight} alt="right" />}
                  previousLabel={<img src={angleLeft} alt="left" />}
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
            </div> */}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  subscriptions: state.admin.subscriptions,
});
export default connect(mapStateToProps, {
  getSubscriptionListByPlanId,
  deleteSubscription,
})(SubscriptionList);
