import React from "react";
import heroBg from "../../assets/images/bg/community.svg";
import whyright from "../../assets/images/insurance/whyright.png";
import ccLogo from "../../assets/images/insurance/Union.png";
import ewLogo from "../../assets/images/insurance/elevate-wellness-logo.png";
import "./why.scss";
import parse from 'html-react-parser';

const Why = ({ data }) => {
    return (
        <div className="whyArea">


            <div className="mainContainer">
                <div className="whyContainer">
                    <div className="whyContent">
                        <div>
                            <h1>{parse(data?.why_join_title || '')}</h1>
                            <p>
                                {parse(data?.why_join_sub_title || '' || '')}
                            </p>
                        </div>

                        <div className="bottomimages">
                            <img src={ccLogo} alt="" className="ccLogo" />
                            <h1>+</h1>
                            <img src={ewLogo} alt="" className="ewLogo" />
                        </div>
                    </div>

                    <div className="whyShape" src={heroBg} alt="shape" >


                        <div className="whyRight">
                            <ul className="whyVideos">
                                <li>
                                    <div className="whyvideo">
                                        <img src={data?.why_join_image || whyright} alt="" />
                                        <span
                                            className="videoBg"
                                            style={{
                                                background:
                                                    "linear-gradient(180deg, rgba(238, 186, 84, 0) 0%, #8aece1 100%)",
                                            }}
                                        ></span>
                                        <span
                                            className="videobarBg"
                                            style={{
                                                background:
                                                    "linear-gradient(180deg, #8aece1 0%, rgba(255, 115, 27, 0) 100%), #8aece1",
                                            }}
                                        ></span>
                                    </div>
                                </li>
                            </ul>

                            <p>
                                {data?.why_join_details || ''}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Why;
