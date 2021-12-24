import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// images
import arrow from "../../../assets/images/arrow.svg";
import { getFeaturedResourceData } from "../../../containers/resources/actions";
import { SEC_FIVE } from "../../transition/constants";
import useAnimRef from "../../transition/useAnimRef";
import "./style.scss";

const FeaturedResources = (props) => {
  const {elRef} = useAnimRef({ section: SEC_FIVE, id: 4 })
  useEffect(() => {
    props.getFeaturedResourceData();
  }, []);
  const handleClickTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <section ref={elRef} className="featuredResourcesArea">
      <div className="featuredMainContainer">
        <div className="featuredContainer">
          <div className="featuredSectionTitle">
            <h2>Browse Our Featured Resources</h2>
            <Link onClick={handleClickTop} className="joinBtn" to="/resources">
              View All Resources <img src={arrow} alt="arrow" />
            </Link>
          </div>
          <div className="featuredResourcesWrapper">
            <h4 className="featuredTitle">Don’t they look helpful?</h4>
            <ul className="featuredResourcesItems">
              {props.featured_resources
                ?.slice(0, window.innerWidth < 767 ? 3 : 6)
                .map((item, i) => (
                  <li key={i} className="featuredResource">
                    <Link
                      className="featureImage"
                      to={`/resources/${item.id}/${item.url?.toLowerCase()}`}
                      onClick={handleClickTop}
                    >
                      <img src={item.thumbnail} alt={item.name} loading='lazy' />
                      <span
                        style={{
                          background: `${
                            (item.resource_color === "pink/yellow" &&
                              "#F29EC6") ||
                            (item.resource_color === "blue/purple" &&
                              "#777DEF") ||
                            (item.resource_color === "purple/green" &&
                              "#A3ACFB") ||
                            (item.resource_color === "green/yellow" &&
                              "#7ADBD1") ||
                            (item.resource_color === "blue/lightBlue" &&
                              "#54A7D9") ||
                            (item.resource_color === "green/teal" && "#00C998")
                          }`,
                        }}
                        className="borderImage"
                      ></span>
                      <div className="featureMeta">
                        <span className="subtitle">
                          {item.categories?.split(",").map((item) => (
                            <span>{item}</span>
                          ))}
                        </span>
                        <span className="label">New</span>
                      </div>
                    </Link>
                    <h4>
                      <Link
                        onClick={handleClickTop}
                        to={`/resources/${item.id}/${item.url?.toLowerCase()}`}
                      >
                        {item.name}
                      </Link>
                    </h4>
                  </li>
                ))}
            </ul>
          </div>
          <div className="text-center d-block mt-30 d-md-none">
            <Link onClick={handleClickTop} className="joinBtn" to="/resources">
              Browse Our Featured Resources <img src={arrow} alt="arrow" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  featured_resources: state.resources.featured_resources,
});
export default connect(mapStateToProps, {
  getFeaturedResourceData,
})(FeaturedResources);
