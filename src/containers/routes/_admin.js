import React, { Component, Fragment } from "react";
import { Route, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import AdminHeader from "../../components/admin/header";
import "./style.scss";

const cookie = new Cookies();
export class AdminRoute extends Component {
  componentDidMount() {
    if (!cookie.get("user_token") || cookie.get("user_info").role !== "Admin") {
      this.props.history.push("/admin");
    } else {
      if (cookie.get("user_info").role === "User") {
        this.props.history.push('/');
      }
    }
  }
  render() {
    return (
      <Fragment>
        <AdminHeader />
        <div className="adminBody">
          <Route {...this.props} render={(props) => <Component {...props} />} />
        </div>
      </Fragment>
    );
  }
}

export default withRouter(AdminRoute);
