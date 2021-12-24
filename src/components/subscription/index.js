import React from "react";
import "./style.scss";

const Pricing = () => {
    return (
        <div className="pricing">
            <h1>Select Your Membership</h1>
            <div className="pricing__packages">
                <div className="pricing__package">
                    <div className="pricing__header pricing__package--firstheader">
                        <p>Basic</p>
                        <span>Current</span>
                    </div>
                    <div className="pricing__body">
                        <p>Explore what the community has to offer</p>
                        <h2>Free</h2>

                        <ul>
                            <li>Access to limited downloadable resources</li>
                            <li>Participate in our Community Forum</li>
                            <li>View reduced rate health insurance plans only</li>
                        </ul>

                        <button>TRY FOR FREE</button>
                    </div>
                </div>
                <div className="pricing__package" id="last">
                    <div className="pricing__header">
                        <p>Premium</p>
                    </div>
                    <div className="pricing__body">
                        <p>Grow and gain clarity</p>
                        <h2>
                            $97<span>/year</span>
                        </h2>

                        <ul>
                            <li>Access to 8 Premium + bonus downloadable resources</li>
                            <li>Participate in our Community Forum</li>
                            <li>Enroll in reduced rate health insurance plans</li>
                        </ul>

                        <button id="lastbtn">Go Premium</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
