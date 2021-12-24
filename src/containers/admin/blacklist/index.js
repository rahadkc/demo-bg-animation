import moment from "moment";
import React, {Fragment, useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {connect} from "react-redux";
import Select from "react-select";
import {Modal} from "reactstrap";
import angleLeft from "../../../assets/images/icons/angle-left.svg";
import angleRight from "../../../assets/images/icons/angle-right.svg";
import cancel from "../../../assets/images/icons/cancel.svg";
import crose from "../../../assets/images/icons/crose.svg";
import searchIcon from "../../../assets/images/icons/search.svg";
import submit from "../../../assets/images/icons/submit.svg";
import {
  addBlockListSingleUser,
  getAllBlacklistDataAction,
  getAllIpListDataAction,
} from "../dashboard/actions";
import "./style.scss";

const BlackList = (props) => {
  const [addBlacklistIP, setAddBlacklistIP] = useState(false);
  const [search, setSearch] = useState("");
  const [getIp, setGetIp] = useState("");
  const [shot, setShot] = useState(25);
  const [selected, setSelected] = useState(0);

  const handleChange = (value) => {
    setSelected(value.selected);
    props.getAllBlacklistDataAction(`paginate=${shot}&page=${value.selected + 1}`);
    handleClickTop();
  };

  const handleOprnBlacklistModal = () => {
    setAddBlacklistIP(true);
  };

  useEffect(() => {
    props.getAllBlacklistDataAction(`paginate=${shot}`);
    props.getAllIpListDataAction();
  }, []);

  const handleClickTop = () => {
    window.scrollTo(0, 0);
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    props.getAllBlacklistDataAction(`search=${e.target.value}`);
  };

  const handleChangePaginate = (e) => {
    setShot(e.target.value);
    props.getAllBlacklistDataAction(`paginate=${e.target.value}`);
    handleClickTop();
  };

  const handleBlocklistSubmit = () => {
    const data = {
      ip: getIp,
    };
    props.addBlockListSingleUser(data, null, setAddBlacklistIP);
  };

  return (
    <Fragment>
      <div className="blackListArea">
        <div className="adminContainer">
          <div className="d-flex flex-wrap align-items-center justify-content-between titleBoxWrap">
            <h2 className="adminSectionTitle">Blacklisted IP Addresses</h2>
            <button
              onClick={handleOprnBlacklistModal}
              type="button"
              className="adminBtn mt-sm-15"
            >
              Blacklist IP Address
            </button>
          </div>
          <div className="d-flex flex-wrap align-items-center justify-content-between searchBoxWrap">
            <p className="searchList">
              <input
                type="text"
                value={search}
                onChange={handleChangeSearch}
                placeholder="Search by I.P. Address"
              />
              <img src={searchIcon} alt="search"/>
            </p>
            {props.blacklist?.total > 0 ? (
              <div className="shortingFilter">
                <select value={shot} onChange={handleChangePaginate}>
                  <option value="5">Showing 5</option>
                  <option value="10">Showing 10</option>
                  <option value="25">Showing 25</option>
                  <option value="50">Showing 50</option>
                </select>
                <span>out of {props.blacklist?.total}</span>
              </div>
            ) : (
              <span>0 Results</span>
            )}
          </div>

          {props.blacklist?.total > 0 ? (
            <Fragment>
              <div className="tableResponsive">
                <table className="tableStyle">
                  <thead>
                  <tr>
                    <th>I.P. ADDRESS</th>
                    <th>Since</th>
                    <th>Account Associated</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  {props.blacklist?.data?.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <strong>{item.ip}</strong>
                      </td>

                      <td>
                        {moment(item.created_at).format("DD MMMM YYYY")}{" "}
                      </td>
                      <td>{item.users.name}</td>
                      <td className="text-right">
                        <span className="tablebtn">Whitelist Ip Address</span>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex flex-wrap justify-content-between align-items-center">
                {props.blacklist?.total > props.blacklist?.per_page && (
                  <ReactPaginate
                    containerClassName="paginationWrapper"
                    pageCount={props.blacklist.total / props.blacklist.per_page}
                    pageRangeDisplayed={props.blacklist.per_page}
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
                  <span>out of {props.blacklist?.total}</span>
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
          <span className="label">IP Address:</span>
          <Select
            name="expertise"
            getOptionValue={(option) => option.ip}
            getOptionLabel={(option) => option.ip}
            options={props.ip_list}
            className="reactSelect"
            classNamePrefix="reactSelectPrefix"
            placeholder="24.165.112.41"
            onChange={(e) => setGetIp(e.ip)}
          />
          <ul className="modalBtns">
            <li>
              <button onClick={handleBlocklistSubmit} className="success">
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
  blacklist: state.admin.blacklist,
  ip_list: state.admin.ip_list,
});

export default connect(mapStateToProps, {
  getAllBlacklistDataAction,
  addBlockListSingleUser,
  getAllIpListDataAction,
})(BlackList);
