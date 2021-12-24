import React, {useState, useEffect} from "react";
import "./style.scss";
import Cookies from "universal-cookie";
import PremiumModal from "../premiumModal";
import superagent from "superagent";
import {base_url} from "../../utils/constants";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import {getAccountInformation} from "../../containers/account/actions";
import parse from "html-react-parser";

const cookie = new Cookies();

const Plans = (props) => {
  const [upgradeModal, setUpgradeModal] = useState(false);

  const upgradeToPremiumNow = () => {
    superagent
      .get(`${base_url}subscription/PREMIUM?type=plan`)
      .set("accept", "application/json")
      .set("Authorization", cookie.get("user_token"))
      .end((err, res) => {
        window.location = res.body.url;
      });
  };

  useEffect(() => {
    if (cookie.get("user_token")) {
      props.getAccountInformation();
    }
  }, []);

  return (
    <>
      <div className="plans">
        {props?.plans?.map((plan, index) => (
          <div className={`${index % 2 === 0 ? "bgblue" : ""} plan`}>
            <div className="plancontainer">
              <h1>{plan?.title || ""}</h1>
              <div>{parse(plan?.description || "") || ""}</div>
              <div className="pricing__packages">
                {plan?.subscriptions?.map((subscription) => (
                  <div className="pricing__package">
                    <div className="pricing__header pricing__header--one">
                      <p>{subscription?.title || ""}</p>
                    </div>
                    <div className="pricing__body">
                      {subscription?.available_in ? (
                        <div className="topdivider">
                          {subscription?.available_in}
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="pricing__price">
                        <p>{subscription?.price_title || ""}</p>
                        <h2>${subscription?.price || ""}</h2>
                      </div>
                      <div>
                        <ul>
                          {parse(subscription?.body)}
                        </ul>

                        {!cookie.get("user_info") ? (
                          <Link to="/signup">
                            {" "}
                            <button>Apply For Plan</button>
                            {" "}
                          </Link>
                        ) : props?.user_info?.subscription_type === "BASIC"
                        || props?.user_info?.subscription_type === null ? (
                          <button onClick={() => setUpgradeModal(true)}>
                            Apply For Plan
                          </button>
                        ) : props?.user_info?.subscription_type === "PREMIUM"
                        || props?.user_info?.subscription_type === "FOUNDER" ? (
                          <Link to="/apply-for-plan">
                            {" "}
                            <button>Apply For Plan</button>
                            {" "}
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {upgradeModal && (
        <PremiumModal
          isOpen={upgradeModal}
          onClosed={() => setUpgradeModal(false)}
          title="Unlock Premium Features"
          content="Do you like what you’ve experienced so far? Unlock more potential:"
          price="$97"
          submit={upgradeToPremiumNow}
          submitBtn={true}
          values={upgradeToPremiumNow}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  user_info: state.my_account.user_info,
});

export default connect(mapStateToProps, {
  getAccountInformation,
})(withRouter(Plans));
