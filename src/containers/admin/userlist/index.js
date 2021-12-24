import moment from "moment";
import React, {Fragment, useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Modal} from "reactstrap";
import angleLeft from "../../../assets/images/icons/angle-left.svg";
import angleRight from "../../../assets/images/icons/angle-right.svg";
import cancel from "../../../assets/images/icons/cancel.svg";
import crose from "../../../assets/images/icons/crose.svg";
import searchIcon from "../../../assets/images/icons/search.svg";
import submit from "../../../assets/images/icons/submit.svg";
import {translateToString} from "../../../utils/commonFunctions";
import {getAllUsersDataAction} from "../dashboard/actions";
import "./style.scss";

const UserList = (props) => {
  const [addBlacklistIP, setAddBlacklistIP] = useState(false);
  const [search, setSearch] = useState("");
  const [shot, setShot] = useState(25);
  const [selected, setSelected] = useState(0);

  const handleChange = (value) => {
    setSelected(value.selected);
    props.getAllUsersDataAction(`paginate=${shot}&page=${value.selected + 1}`);
    handleClickTop();
  };

  const handleOprnBlacklistModal = () => {
    setAddBlacklistIP(true);
  };

  useEffect(() => {
    props.getAllUsersDataAction(`paginate=${shot}`);
  }, []);

  const handleClickTop = () => {
    window.scrollTo(0, 0);
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    props.getAllUsersDataAction(`search=${e.target.value}`);
  };

  const handleChangePaginate = (e) => {
    setShot(e.target.value);
    props.getAllUsersDataAction(`paginate=${e.target.value}`);
    handleClickTop();
  };

  return (
    <Fragment>
      <div className="blackListArea">
        <div className="adminContainer">
          <div className="d-flex flex-wrap align-items-center justify-content-between titleBoxWrap">
            <h2 className="adminSectionTitle">All Users</h2>
            <Link to="/admin/add-new-user" className="adminBtn adminBtnBlack">
              Add A User
            </Link>
          </div>
          <div className="d-flex flex-wrap align-items-center justify-content-between searchBoxWrap">
            <p className="searchList">
              <input
                type="text"
                value={search}
                onChange={handleChangeSearch}
                placeholder="Search by Name or E-mail"
              />
              <img src={searchIcon} alt="search"/>
            </p>
            {props.user_list?.total > 0 ? (
              <div className="shortingFilter">
                <select value={shot} onChange={handleChangePaginate}>
                  <option value="5">Showing 5</option>
                  <option value="10">Showing 10</option>
                  <option value="25">Showing 25</option>
                  <option value="50">Showing 50</option>
                </select>
                <span>out of {props.user_list?.total}</span>
              </div>
            ) : (
              <span>0 Results</span>
            )}
          </div>
          {props.user_list?.total > 0 ? (
            <Fragment>
              <div className="tableResponsive">
                <table className="tableStyle">
                  <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>E-mail</th>
                    <th>Role</th>
                    <th>Activity</th>
                    <th>Last Log In</th>
                    <th>Joined On</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  {props.user_list?.data?.map((item) => (
                    <tr
                      className={item.status === "Banned" ? "bannedRow" : ""}
                      key={item.id}
                    >
                      <td>
                        <strong>{item.name}</strong>
                      </td>
                      <td>{item.email}</td>
                      <td>
                        {item.role === "User"
                          ? item.subscription_type === "PREMIUM"
                            ? "Premium " + item.role
                            : "Basic " + item.role
                          : item.role}
                      </td>
                      <td>{item.status}</td>
                      <td>
                        {moment(item.last_login).format("DD MMMM YYYY")}
                      </td>
                      <td>
                        {moment(item.created_at).format("DD MMMM YYYY")}
                      </td>
                      <td className="text-right">
                        <Link
                          className="tablebtn"
                          to={`/admin/users/${item.id}/${translateToString(
                            item.name?.toLowerCase()
                          )}`}
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex flex-wrap justify-content-between align-items-center">
                {props.user_list?.total > props.user_list?.per_page && (
                  <ReactPaginate
                    containerClassName="paginationWrapper"
                    pageCount={props.user_list.total / props.user_list.per_page}
                    pageRangeDisplayed={props.user_list.per_page}
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
                  <span>out of {props.user_list?.total}</span>
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
      <Modal
        isOpen={addBlacklistIP}
        toggle={handleOprnBlacklistModal}
        centered
        fade={false}
        onClosed={() => setAddBlacklistIP(false)}
        backdropClassName="signupModalWrapBackdrop"
        className="blackListModal"
      >
        <span
          onClick={() => setAddBlacklistIP(false)}
          className="signupCroseBtn"
        >
          <img src={crose} alt="crose"/>
        </span>
        <div className="blackListModalWrap">
          <h2>Enter the IP address that you wish to blacklist.</h2>
          <ul className="modalBtns">
            <li>
              <button className="success">
                Yes, Do It <img src={submit} alt="submit"/>
              </button>
            </li>
            <li>
              <button
                onClick={() => setAddBlacklistIP(false)}
                className="error"
              >
                No, Don’t Do It <img src={cancel} alt="submit"/>
              </button>
            </li>
          </ul>
        </div>
      </Modal>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  user_list: state.admin.user_list,
});
export default connect(mapStateToProps, {
  getAllUsersDataAction,
})(UserList);
