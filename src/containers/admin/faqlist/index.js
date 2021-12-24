import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import deleteIcon from "../../../assets/images/icons/list/delete.svg";
import editIcon from "../../../assets/images/icons/list/edit.svg";
import { getShortContent } from "../../../utils/commonFunctions";
import { deleteFAQ, getFAQs } from "../dashboard/actions";
import "./style.scss";

const FaqList = (props) => {
console.log(props);

  const deleteResponseHandler = (id) => {
    props.deleteFAQ(id);
  };

  return (
    <Fragment>
      <div className="blackListArea">

      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  faqs: state.admin.faqs,
});
export default connect(mapStateToProps, {
  getFAQs,
  deleteFAQ,
})(FaqList);
