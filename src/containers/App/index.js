import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
// import Transition from "../../components/transition";
import Routes from "../routes";
import "./style.scss";

const App = (props) => {
  return (
    <Fragment>
      <Helmet defaultTitle="CLC Development" />
      <Routes />
    </Fragment>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(App);
