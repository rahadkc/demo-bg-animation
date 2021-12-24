import React from "react";
import "./disclaimer.scss";

const Disclaimer = ({disclaimer}) => {
    return (
        <div className="disclaimer">
            <b>Disclaimer:</b>

            <p>
                Clarity Cooperative (CC) is not a licensed insurance agent. CC contracts with Elevate to Wellness (EW), a nationally licensed insurance producer. EW is acting as the health insurance agent of record for health (medical, dental, and vision) insurance. EW pays new member fees to CC, which are used for the general operating expenses of CC. Coverage is subject to all terms, conditions, limitations and exclusions set forth in the contract of insurance. You should consider your own needs when selecting health insurance products. CC does not make specific product recommendations for individuals. Each insurer has sole responsibility for its products. CC is not an insurer.
            </p>
        </div>
    );
};

export default Disclaimer;
