import React, { useState, useEffect } from "react";
import "./faq.scss";
import { Collapse } from "reactstrap";
import crose from "../../../assets/images/icons/crose.svg";
import plus from "../../../assets/images/icons/plus.svg";
import { getFAQS } from "./actions";
import { connect } from "react-redux";

const Faq = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCollapse = (data) => {
    setIsOpen(data);
  };

  useEffect(() => {
    props.getFAQS();
  }, []);

  return (
    <div className="faq">
      <div className="faq__container">
        <div className="faq__header">
          <h2>Frequently Asked Questions</h2>
          <p>
            Learn more about how health insurance plans work through the
            Cooperative
          </p>
        </div>
        <div className="faq__body">
          <ul className="faqsItems">
            {props?.faqs?.faq?.map((faq, i) => (
              <li className={isOpen === i ? "active" : ""} key={i}>
                <h3 onClick={() => handleCollapse(i)}>
                  {faq.question}{" "}
                  <img src={isOpen === i ? crose : plus} alt={faq.question} />
                </h3>
                <Collapse isOpen={isOpen === i ? true : false}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: faq.answer,
                    }}
                  />
                </Collapse>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  faqs: state.faqs.faqs,
});

export default connect(mapStateToProps, {
  getFAQS,
})(Faq);