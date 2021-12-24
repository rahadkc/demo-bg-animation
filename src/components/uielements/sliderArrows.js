import React from "react";
import arrowLeft from "../../assets/images/icons/arrow-black-left.svg";
import arrowRight from "../../assets/images/icons/arrow-black-right.svg";

export const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <img src={arrowRight} alt="right" />
    </div>
  );
};

export const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <img src={arrowLeft} alt="next" />
    </div>
  );
};
