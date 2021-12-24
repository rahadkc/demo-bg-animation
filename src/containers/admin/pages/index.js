import moment from "moment";
import React, {Fragment, useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import angleLeft from "../../../assets/images/icons/angle-left.svg";
import angleRight from "../../../assets/images/icons/angle-right.svg";
import editIcon from "../../../assets/images/icons/list/edit.svg";
import viewIcon from "../../../assets/images/icons/list/view.svg";
import searchIcon from "../../../assets/images/icons/search.svg";
import {getPagesListAction} from "../dashboard/actions";
import "./style.scss";

const PagesList = (props) => {
  const [search, setSearch] = useState("");
  const [shot, setShot] = useState(15);
  const [selected, setSelected] = useState(0);

  const handleChange = (value) => {
    setSelected(value.selected);
    props.getPagesListAction(`paginate=${shot}&page=${value.selected + 1}`);
    handleClickTop();
  };

  useEffect(() => {
    props.getPagesListAction(`paginate=${shot}`);
  }, []);

  const handleClickTop = () => {
    window.scrollTo(0, 0);
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    props.getPagesListAction(`search=${e.target.value}`);
  };

  const handleChangePaginate = (e) => {
    setShot(e.target.value);
    props.getPagesListAction(`paginate=${e.target.value}`);
    handleClickTop();
  };

  return (
    <Fragment>
      <div className="blackListArea">
        <div className="adminContainer">
          <div className="d-flex flex-wrap align-items-center justify-content-between titleBoxWrap">
            <h2 className="adminSectionTitle">Pages</h2>
          </div>
          <div className="d-flex flex-wrap align-items-center justify-content-between searchBoxWrap">
            <p className="searchList">
              <input
                type="text"
                value={search}
                onChange={handleChangeSearch}
                placeholder="Search by Page Name"
              />
              <img src={searchIcon} alt="search"/>
            </p>
            {props.pages?.total > 0 ? (
              <div className="shortingFilter">
                <select value={shot} onChange={handleChangePaginate}>
                  <option value="5">Showing 5</option>
                  <option value="10">Showing 10</option>
                  <option value="25">Showing 25</option>
                  <option value="50">Showing 50</option>
                </select>
                <span>out of {props.pages?.total}</span>
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
                  <th>Page Name</th>
                  <th>SLUG</th>
                  <th>Created ON</th>
                  <th>UPDATED ON</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                {props.pages?.data?.map((item, i) => (
                  <tr key={i}>
                    <td>
                      <strong>
                        <Link to="/">{item.name}</Link>
                      </strong>
                    </td>
                    <td>{item.slug}</td>
                    <td>{moment(item.created_at).format("DD/MM/YYYY")}</td>
                    <td>{moment(item.updated_at).format("DD/MM/YYYY")}</td>
                    <td className="text-right">
                      <ul className="actionBtns">
                        <li>
                          <Link to={item.slug}>
                            <img src={viewIcon} alt="view"/>
                          </Link>
                        </li>
                        <li>
                          <Link to={`/admin/pages${item.admin_slug}`}>
                            <img src={editIcon} alt="edit"/>
                          </Link>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex flex-wrap justify-content-between align-items-center">
              {props.pages?.total > props.pages?.per_page && (
                <ReactPaginate
                  containerClassName="paginationWrapper"
                  pageCount={props.pages.total / props.pages.per_page}
                  pageRangeDisplayed={props.pages.per_page}
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
                <span>out of {props.pages?.total}</span>
              </div>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  pages: state.admin.pages,
});

export default connect(mapStateToProps, {
  getPagesListAction,
})(PagesList);
