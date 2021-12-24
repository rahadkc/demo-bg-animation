import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
export class PublicRoute extends Component {
  render() {
    return (
      <Fragment>
        <div className="publicBody">
          <Route {...this.props} render={(props) => <Component {...props} />} />
        </div>
      </Fragment>
    );
  }
}

export default PublicRoute;
