import React from 'react'
import {Link} from "react-router-dom";

const SatisfactionGuaranteed = ({data = []}) => {
  return (
    <div className="satisfaction_guaranteed">
      <div className="satisfaction_guaranteed_header">
        <img src={data.satisfaction_icons} width="50px" alt="Satisfaction Guaranteed"/>

        <h2>
          {data.satisfaction_title}
        </h2>

        <p>
          {data.satisfaction_description}
        </p>

        <div>
          <Link to={data.satisfaction_button_link}>
            {data.satisfaction_button_title}{" "}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              />
            </svg>
          </Link>
        </div>


      </div>

      <div className="satisfaction_slider">
        {
          !!data.satisfaction_slider ? data.satisfaction_slider.map((imgSrc, index) => {
            return (
              <div key={index}>
                <img src={imgSrc.image} alt="slider"/>
              </div>
            )

          }) : null
        }
      </div>
    </div>
  )
}

export default SatisfactionGuaranteed