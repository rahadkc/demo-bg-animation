import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./style.scss";

const Dashboard = (props) => {
  return (
    <Fragment>
      <div className="blackListArea">
        <div className="adminContainer">
          <h1>Dashboard</h1>
        </div>
      </div>
    </Fragment>
  );
};
export default connect(null, {})(withRouter(Dashboard));
