import { useEffect } from "react";
import { useLocation, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getDiscourseURL } from "./actions";

function Discourse(props) {
  const { search } = useLocation();

  useEffect(() => {
    let params = new URLSearchParams(search);

    const data = {
      sso: params.get("sso"),
      sig: params.get("sig"),
    };

    props.getDiscourseURL(data, props.history);
  }, []);
  return <span>Log In to community...</span>;
}

const mapStateToProps = (state) => ({
  user_info: state.my_account.user_info,
});

export default connect(mapStateToProps, {
  getDiscourseURL,
})(withRouter(Discourse));
