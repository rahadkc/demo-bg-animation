import React, {useEffect, useState} from "react";
import "./style.scss";
import {checkEmptyObject} from "../../utils/commonFunctions";
import {useHistory, useLocation} from "react-router-dom";
import superagent from "superagent";
import {base_url} from "../../utils/constants";
import Cookies from "universal-cookie";
import PremiumModal from "../../components/premiumModal";
import FounderModal from "../../components/FounderModal";

const cookie = new Cookies();

export default function Membership({userInfo}) {
  const [selectedPackage, setSelectedPackage] = useState("");
  const [premiumUpgradeModal, setPremiumUpgradeModal] = useState(false);
  const [founderUpgradeModal, setFounderUpgradeModal] = useState(false);

  const [basicDisabled, setBasicDisabled] = useState("");
  const [premiumDisabled, setPremiumDisabled] = useState("");

  useEffect(() => {
    setSelectedPackage(userInfo?.subscription_type);

    if (userInfo?.subscription_type === "PREMIUM") {
      setBasicDisabled("disabled");
    }

    if (userInfo?.subscription_type === "FOUNDER") {
      setBasicDisabled("disabled");
      setPremiumDisabled("disabled");
    }
  }, [userInfo]);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const history = useHistory();

  const subscribe = (newSubscriptionType) => {
    superagent
      .get(`${base_url}subscription/${newSubscriptionType}`)
      .set("accept", "application/json")
      .set("Authorization", cookie.get("user_token"))
      .end((err, res) => {
        if (res) {
          window.location = res.body.url;
        }
      });
  };

  const handleSubscription = async (newSubscriptionType) => {
    if (checkEmptyObject(userInfo)) {
      history.push("/signup");
    }

    // subscribe for new user
    if (userInfo?.subscription_type === null) {
      subscribe(newSubscriptionType);
    }

    if (newSubscriptionType === userInfo?.subscription_type) {
      history.push("/my-account");
    }

    if (newSubscriptionType === "PREMIUM") {
      setPremiumUpgradeModal(true);
    }

    if (newSubscriptionType === "FOUNDER") {
      setFounderUpgradeModal(true);
    }
  };

  const subscribeToPremium = () => {
    superagent
      .get(`${base_url}subscription/PREMIUM`)
      .set("accept", "application/json")
      .set("Authorization", cookie.get("user_token"))
      .end((err, res) => {
        window.location = res.body.url;
      });
  };

  const subscribeToFounder = () => {
    superagent
      .get(`${base_url}subscription/FOUNDER`)
      .set("accept", "application/json")
      .set("Authorization", cookie.get("user_token"))
      .end((err, res) => {
        window.location = res.body.url;
      });
  };

  return (
    <div className="pricing_wrapper">
      <h1 className="pricingheading">Select Your Membership</h1>
      <div className="pricing">
        <div className="pricing__packages">
          <div className="pricing__package basic">
            <div className="pricing__header pricing__package--firstheader">
              <p>Basic</p>
              {selectedPackage === "BASIC" && <span>CURRENT</span>}
            </div>
            <div className="pricing__body">
              <div className="pricing__title">
                <p>Explore what the community has to offer</p>
                <h2>Free</h2>
              </div>

              <div className="pricing__content">
                <ul>
                  <li>Access to limited downloadable resources</li>
                  <li>Participate in our Community Forum</li>
                  <li>View reduced rate health insurance plans only</li>
                </ul>
              </div>
            </div>
            <div className="pricing__action">
              <button
                onClick={() => handleSubscription("BASIC")}
                disabled={basicDisabled}
              >
                TRY FOR FREE
              </button>
            </div>
          </div>

          <div className="pricing__package premium">
            <div className="pricing__header">
              <p>Premium</p>
              {selectedPackage === "PREMIUM" && <span>CURRENT</span>}
            </div>
            <div className="pricing__body">
              <div className="pricing__title">
                <p>Grow and gain clarity</p>
                <h2>
                  $97<span>/year</span>
                </h2>
              </div>

              <div className="pricing__content">
                <ul>
                  <li>Access to 8 Premium + bonus downloadable resources</li>
                  <li>Participate in our Community Forum</li>
                  <li>Enroll in reduced rate health insurance plans</li>
                </ul>
              </div>
            </div>
            <div className="pricing__action">
              <button
                onClick={() => handleSubscription("PREMIUM")}
                disabled={premiumDisabled}
              >
                GO PREMIUM
              </button>
            </div>
          </div>

          <div className="pricing__package founder">
            <div className="pricing__header">
              <p>Founder</p>
              {selectedPackage === "FOUNDER" && <span>CURRENT</span>}
            </div>
            <div className="pricing__body">
              <div className="pricing__title">
                <p>Confidently launch your practice</p>
                <h2>
                  $197<span>/year</span>
                </h2>
              </div>

              <div className="pricing__content">
                <ul>
                  <li>Access to Premium + Foundational resources</li>
                  <li>Participate in our Community Forum</li>
                  <li>Enroll in reduced rate health insurance plans</li>
                </ul>
              </div>
            </div>
            <div className="pricing__action">
              <button
                onClick={() => handleSubscription("FOUNDER")}
              >
                GO FOUNDER
              </button>
            </div>
          </div>
        </div>
      </div>

      {premiumUpgradeModal && (
        <PremiumModal
          isOpen={premiumUpgradeModal}
          onClosed={() => setPremiumUpgradeModal(false)}
          title="Unlock Premium Features"
          content="Do you like what you’ve experienced so far? Unlock more potential:"
          price="$97"
          submit={subscribeToPremium}
          submitBtn={true}
          values={subscribeToPremium}
        />
      )}

      {founderUpgradeModal && (
        <FounderModal
          isOpen={founderUpgradeModal}
          onClosed={() => setFounderUpgradeModal(false)}
          title="Unlock Founder Features"
          content="Do you like what you’ve experienced so far? Unlock more potential:"
          price="$197"
          submit={subscribeToFounder}
          submitBtn={true}
          values={subscribeToFounder}
        />
      )}
    </div>
  );
}
