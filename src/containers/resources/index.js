import React, { Fragment, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Element, Link } from "react-scroll";
import angleDown from "../../assets/images/angle-down.svg";
import menuBg from "../../assets/images/bg/menu/resources.svg";
import angleLeft from "../../assets/images/icons/angle-left.svg";
import angleRight from "../../assets/images/icons/angle-right.svg";
import scrollText from "../../assets/images/scroll.svg";
import Footer from "../../components/footer";
import FooterBottom from "../../components/footerBottom";
// components
import Header from "../../components/header";
import "../../components/home/resources/style.scss";
import LeftSideMenu from "../../components/leftmenu";
import MainMenu from "../../components/mainMenu";
import { getResourceDetailsAction } from "../App/actions";
import { getCategoryData, getPublicResourceData } from "./actions";
import "./style.scss";
// index for items checked Mobile view
const resourceTypeIndex = ['how-to-guides', 'spreadsheets', 'calculators-tools', 'checklists']

const Resources = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [selected, setSelected] = useState(0);
  const [filterView, setFilterView] = useState(false);
  const [resourceCategory, setResourceCategory] = useState(
      props.categories?.data
  );
  const [query, setQuery] = useState("");
  const resourceItemWrapRef = useRef(null);

  const [filterState, setFilterState] = useState({
    categories: [],
    type: [],
    level: [],
    order: "",
    paginate: 25,
  });



  const [resourceType, setResourceType] = useState([
    {
      name: "How-To-Guides",
      value: "how-to-guides",
      checked: false,
    },
    {
      name: "Spreadsheets",
      value: "spreadsheets",
      checked: false,
    },
    {
      name: "Calculators + Tools",
      value: "calculators-tools",
      checked: false,
    },
    {
      name: "Checklists",
      value: "checklists",
      checked: false,
    },
    {
      name: "Forms",
      value: "forms",
      checked: false,
    },
  ]);

  const [level, setLevel] = useState([
    {
      name: "Basic",
      value: "BASIC",
      checked: false,
    },
    {
      name: "Premium",
      value: "PREMIUM",
      checked: false,
    },
    {
      name: "Founder",
      value: "FOUNDER",
      checked: false,
    },
  ]);

  const handleChange = (value) => {
    setSelected(value.selected);
    props.getPublicResourceData(`${query}&page=${value.selected + 1}`);
    resourceItemWrapRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // State for Mobile Viewpoint
  const [stateWidth, setStateWidth] = useState(window.innerWidth);
  const breakpoint = 620;
  useEffect(() => {
    const handleWindowResize = () => setStateWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  // End of Mobile Viewpoint
  useEffect(() => {
    props.getPublicResourceData(`paginate=25`);
    props.getCategoryData();
    props.getResourceDetailsAction();
  }, []);

  useEffect(() => {
    props.getCategoryData();
    props.getResourceDetailsAction();
  }, []);

  useEffect(() => {
    setResourceCategory(
        props.categories?.data?.map((item) => {
          return {
            ...item,
            checked: false,
          };
        })
    );
  }, [props.categories?.data]);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleCloseMenuMenu = () => {
    setOpenMenu(false);
  };

  const handleChangePaginate = (e) => {
    setFilterState({
      ...filterState,
      paginate: parseInt(e.target.value),
    });
  };

  const handleShortChange = (e) => {
    setFilterState({
      ...filterState,
      order: e.target.value,
    });
  };

  const handleChangeResourceType = (e, i) => {
    const types = [...resourceType];
    const findType = resourceType.find((item, index) => index === i);
    if (e.target.checked) {
      setFilterState({
        ...filterState,
        type: [...filterState.type, { ...findType, index: i }],
      });
      types.splice(i, 1, {
        ...findType,
        checked: true,
      });

      setResourceType(types);
    } else {
      types.splice(i, 1, {
        ...findType,
        checked: false,
      });

      const filterType = [...filterState.type];
      const findIndex = filterType.findIndex((item) => item.index === i);

      filterType.splice(findIndex, 1);
      setResourceType(types);

      setFilterState({
        ...filterState,
        type: filterType,
      });
    }
  };

  // categories filter large screen
  const handleChangeCategory = (e, i) => {
    const category = [...resourceCategory];
    const findCategory = resourceCategory.find((item, index) => index === i);
    if (e.target.checked) {
      setFilterState({
        ...filterState,
        categories: [...filterState.categories, { ...findCategory, index: i }],
      });

      category.splice(i, 1, {
        ...findCategory,
        checked: true,
      });

      setResourceCategory(category);
    } else {
      category.splice(i, 1, {
        ...findCategory,
        checked: false,
      });

      const filterCategory = [...filterState.categories];
      const findIndex = filterCategory.findIndex((item) => item.index === i);

      filterCategory.splice(findIndex, 1);
      setResourceCategory(category);

      setFilterState({
        ...filterState,
        categories: filterCategory,
      });
    }
  };

  const handleChangeLevel = (e, i) => {
    const levels = [...level];
    const findType = level.find((item, index) => index === i);

    if (e.target.checked) {
      setFilterState({
        ...filterState,
        level: [...filterState.level, { ...findType, index: i }],
      });

      levels.splice(i, 1, {
        ...findType,
        checked: true,
      });

      setLevel(levels);
    } else {
      levels.splice(i, 1, {
        ...findType,
        checked: false,
      });

      const filterType = [...filterState.level];
      const findIndex = filterType.findIndex((item) => item.index === i);

      filterType.splice(findIndex, 1);
      setLevel(levels);

      setFilterState({
        ...filterState,
        level: filterType,
      });
    }
  };

  // handle change categories for Mobile Viewpoint
  const handleChangeCategoryMobile = (e) => {
    const [value, i] = e.target.value.split('__');
    const category = [...resourceCategory];
    const findCategory = props.categories?.data.find((item, index) => index === Number(i));

    setFilterState({
      ...filterState,
      categories: [{ ...findCategory, checked: true, index: Number(i) }],
    });
    category.splice(Number(i), 1, {
      ...findCategory,
      checked: true,
    });
    setResourceCategory([{ ...findCategory, checked: true, index: Number(i) }]);

    const filterCategory = [...filterState.categories];
    const findIndex = filterCategory.findIndex((item) => item.index === Number(i));
    filterCategory.splice(findIndex, 1);
    setResourceCategory(category);
  }
  // end

  // handle level for mobile Viewpoint
  const handleChangeLevelMobile = (e) => {
    const [value, i] = e.target.value.split('__');
    const levels = [...level];
    const findType = level.find((item, index) => index === Number(i));
    setFilterState({
      ...filterState,
      level: [{ ...findType, checked: false, index: Number(i) }],
    });
    levels.splice(Number(i), 1, {
      ...findType,
      checked: true,
    });
    setLevel([{ ...findType, checked: true, index: Number(i) }]);

    const filterType = [...filterState.level];
    const findIndex = levels.findIndex((item) => item.index === Number(i));
    filterType.splice(findIndex, 1);
    setLevel(levels);
  };
  // end

  // handleChangeResourceType for Mobile Viewpoint
  const handleChangeResourceTypeMobile = (e) => {
    const [value, i] = e.target.value.split('__');
    const types = [...resourceType];
    const findType = resourceType.find((item, index) => index === Number(i));

    setFilterState({
      ...filterState,
      type: [{ ...findType, checked: false, index: Number(i) }],
    });
    const filterType = [...filterState.type];
    const findIndex = filterType.findIndex((item) => item.index === Number(i));

    filterType.splice(findIndex, 1);
    setResourceType(types);
  }


  const handleClickTop = () => {
    window.scrollTo(0, 0);
  };

  const handleClear = () => {
    setResourceCategory(props.categories?.data);

    setLevel([
      {
        name: "Basic",
        value: "BASIC",
        checked: false,
      },
      {
        name: "Premium",
        value: "PREMIUM",
        checked: false,
      },
      {
        name: "Founder",
        value: "FOUNDER",
        checked: false,
      },
    ]);

    setResourceType([
      {
        name: "How-To-Guides",
        value: "how-to-guides",
        checked: false,
      },
      {
        name: "Spreadsheets",
        value: "spreadsheets",
        checked: false,
      },
      {
        name: "Calculators + Tools",
        value: "calculators-tools",
        checked: false,
      },
      {
        name: "Checklists",
        value: "checklists",
        checked: false,
      },
      {
        name: "Forms",
        value: "forms",
        checked: false,
      },
    ]);

    setFilterState({
      categories: [],
      type: [],
      level: [],
      order: "",
      paginate: 25,
    });

    setQuery("");
    props.getPublicResourceData(`paginate=25`);
  };

  useEffect(() => {
    // Map through the filters, get the required value, make an array and join them with an '&'
    const categories = filterState.categories
        .map((category) => {
          return `category[]=${category.name}`;
        })
        .join("&");

    const resourceType = filterState.type
        .map((type) => {
          return `resource_type[]=${type.value}`;
        })
        .join("&");

    const levelType = filterState.level
        .map((level) => {
          return `display_type[]=${level.value}`;
        })
        .join("&");

    // Only add the query if that part of the query is available and then inlude an '&'
    const q = `${categories && categories + "&"}${resourceType && resourceType + "&"
    }${levelType && levelType + "&"}order=${filterState.order}&paginate=${filterState.paginate
    }`;
    setQuery(q);
  }, [filterState])

  useEffect(() => {
    setSelected(0);
    props.getPublicResourceData(query);
  }, [query]);

  return (
      <Fragment>
        <Helmet>
          <title>{`${props.resource_cms?.name}  - Clarity Cooperative`}</title>
        </Helmet>
        <LeftSideMenu
            isOpen={openMenu}
            openMenu={handleOpenMenu}
            className="sidebarShadowChange"
            title="Resources"
        />
        <MainMenu
            closeMenu={handleCloseMenuMenu}
            title="NAVIGATE"
            bgImage={menuBg}
            className={openMenu ? "active" : ""}
        />
        <Header
            openMenu={handleOpenMenu}
            className="headerStyleBlack"
            blackLogo={true}
        />
        <div className="resourcesHeroArea">
          <div className="mainContainer">
            <div className="resourcesHeroContainer">
              <div className="resourcesHeroContent">
                <h1>{props.resource_cms?.hero_title}</h1>
                <p>{props.resource_cms?.hero_paragraph}</p>
              </div>
              {props.resource_cms?.hero_image !== undefined && (
                  <div className="resourcesImage">
                    <div className="resourcesImg">
                      <img
                          src={props.resource_cms?.hero_image[0].image}
                          alt="resources"
                      />
                    </div>
                    <div className="resourcesImg">
                      <img
                          src={props.resource_cms?.hero_image[1].image}
                          alt="resources"
                      />
                      <img
                          src={props.resource_cms?.hero_image[2].image}
                          alt="resources"
                      />
                    </div>
                  </div>
              )}
              {props.resource_cms?.hero_image !== undefined && (
                  <ul className="resourcesImageResponsive">
                    <li className="resourcesImageTwo">
                      <img
                          src={props.resource_cms?.hero_image[0].image}
                          alt="resources"
                      />
                      <img
                          src={props.resource_cms?.hero_image[1].image}
                          alt="resources"
                      />
                    </li>

                    <li className="resourcesImageOne">
                      <img
                          src={props.resource_cms?.hero_image[2].image}
                          alt="resources"
                      />
                    </li>
                  </ul>
              )}

              <Link
                  to="test1"
                  spy={true}
                  smooth={true}
                  duration={500}
                  className="scrollBtn scrollBtnResources"
              >
                <img className="scrollText" src={scrollText} alt="text" />
                <img className="angleText" src={angleDown} alt="angle" />
              </Link>
            </div>
          </div>
        </div>
        <Element name="test1">
          <div className="resourcesArea">
            <div className="filterTab">
              <h6>Filter</h6>
              <div onClick={() => setFilterView(!filterView)}>
                {filterView ? (
                    <svg
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                          x="2.03125"
                          y="0.869141"
                          width="24"
                          height="1.5"
                          transform="rotate(45 2.03125 0.869141)"
                          fill="#071446"
                      />
                      <rect
                          x="19"
                          y="1.92969"
                          width="24"
                          height="1.5"
                          transform="rotate(135 19 1.92969)"
                          fill="#071446"
                      />
                    </svg>
                ) : (
                    <svg
                        width="20"
                        height="14"
                        viewBox="0 0 20 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                          y1="0.75"
                          x2="20"
                          y2="0.75"
                          stroke="#071446"
                          stroke-width="1.5"
                      />
                      <line
                          y1="6.75"
                          x2="20"
                          y2="6.75"
                          stroke="#071446"
                          stroke-width="1.5"
                      />
                      <line
                          y1="12.75"
                          x2="20"
                          y2="12.75"
                          stroke="#071446"
                          stroke-width="1.5"
                      />
                    </svg>
                )}
              </div>
            </div>
            {/* Filter Items start from here.  */}
            {filterView ? (
                <div className="filterArea">
                  {/* breakpoint for Large Screen */}
                  {stateWidth > breakpoint ? (
                      <>
                        <ul className="resourcesFilter" >
                          <li className="">
                            <label htmlFor="resourceType">Select Categories</label>
                            {resourceCategory?.map((item, i) => (
                                <div className="chekbox" key={i}>
                                  <div className="chekbox-wrapper">
                                    <input
                                        onChange={(e) => handleChangeCategory(e, i)}
                                        checked={item.checked}
                                        type="checkbox"
                                        className="checboxinput"
                                    />
                                    <span className="checkmark"></span>
                                  </div>
                                  <div className="chekbox-text">{item.name}</div>
                                </div>
                            ))}
                          </li>

                          <li>
                            <label htmlFor="resourceType">RESOURCE TYPE</label>

                            {resourceType?.map((item, i) => (
                                <div className="chekbox" key={i}>
                                  <div className="chekbox-wrapper">
                                    <input
                                        onChange={(e) => handleChangeResourceType(e, i)}
                                        checked={item.checked}
                                        type="checkbox"
                                        className="checboxinput"
                                    />
                                    <span className="checkmark"></span>
                                  </div>
                                  <div className="chekbox-text">{item.name}</div>
                                </div>
                            ))}
                          </li>
                          <li>
                            <label htmlFor="resourceType">level</label>

                            {level?.map((item, i) => (
                                <div className="chekbox" key={i}>
                                  <div className="chekbox-wrapper">
                                    <input
                                        onChange={(e) => handleChangeLevel(e, i)}
                                        checked={item.checked}
                                        type="checkbox"
                                        className="checboxinput"
                                    />
                                    <span className="checkmark"></span>
                                  </div>
                                  <div className="chekbox-text">{item.name}</div>
                                </div>
                            ))}
                          </li>
                          <li>
                            <label htmlFor="sortBy">Sort By</label>
                            <select
                                style={{ marginBottom: "30px" }}
                                onChange={handleShortChange}
                                name="sortBy"
                                id="sortBy"
                                value={filterState.order}
                            >
                              <option value="">Sort By</option>
                              <option value="newest">Newest to Oldest</option>
                              <option value="oldest">Oldest to Newest</option>
                              <option value="a-z">Alphabetical (A-Z)</option>
                              <option value="z-a">Alphabetical (Z-A)</option>
                            </select>

                            <label htmlFor="show">SHOW</label>
                            <select
                                value={filterState.paginate}
                                onChange={handleChangePaginate}
                                id="show"
                            >
                              <option value="5">Showing 5</option>
                              <option value="10">Showing 10</option>
                              <option value="25">Showing 25</option>
                              <option value="50">Showing 50</option>
                            </select>
                          </li>
                        </ul>
                        <button
                            onClick={handleClear}
                            type="button"
                            className="btnStyle"
                            style={{ borderRadius: `40px` }}
                        >
                          Clear Filter
                        </button>
                      </>
                  ) : (
                      <>
                        {/* Design for Mobile Devices or breakpoint 620 */}
                        <ul className="resourcesFilter">
                          <li className="">
                            <label htmlFor="category">Select Category</label>
                            <select
                                style={{ marginBottom: "30px" }}
                                onChange={handleChangeCategoryMobile}
                                name="resourceCategory"
                                id="resourceCategory"
                                value={filterState.resourceCategory}
                            >
                              <option value="">Select Category</option>
                              {resourceCategory.map((item, i) => (
                                  <option key={i} value={`${item.name}__${i}`}>
                                    {item.name}
                                  </option>
                              ))}
                            </select>
                          </li>

                          <li>
                            <label htmlFor="resourceType">RESOURCE TYPE</label>

                            <select
                                style={{ marginBottom: "30px" }}
                                onChange={handleChangeResourceTypeMobile}
                                name="resourceType"
                                value={filterState.resourceType}
                                id="resourceType"
                            >
                              <option value="">Select Type</option>
                              {resourceType.map((item, i) => (
                                  <option key={i} value={`${item.name}__${i}`}>
                                    {item.name}
                                  </option>
                              ))}
                            </select>
                          </li>
                          <li>
                            <label htmlFor="levelType">LEVEL</label>

                            <select
                                style={{ marginBottom: "30px" }}
                                onChange={handleChangeLevelMobile}
                                name="levelType"
                                id="levelType"
                                value={filterState.levelType}
                            >
                              <option value="">Select type</option>
                              {
                                level?.map((item, i) => (
                                    <option key={i} value={`${item.name}__${i}`}>
                                      {item.name}
                                    </option>
                                ))
                              }
                            </select>
                          </li>
                          <li>
                            <label htmlFor="sortBy">Sort By</label>
                            <select
                                style={{ marginBottom: "30px" }}
                                onChange={handleShortChange}
                                name="sortBy"
                                id="sortBy"
                                value={filterState.short}
                            >
                              <option value="">Sort By</option>
                              <option value="newest">Newest to Oldest</option>
                              <option value="oldest">Oldest to Newest</option>
                              <option value="a-z">Alphabetical (A-Z)</option>
                              <option value="z-a">Alphabetical (Z-A)</option>
                            </select>

                            <label htmlFor="show">SHOW</label>
                            <select
                                value={filterState.paginate}
                                onChange={handleChangePaginate}
                                id="show"
                            >
                              <option value="5">Showing 5</option>
                              <option value="10">Showing 10</option>
                              <option value="25">Showing 25</option>
                              <option value="50">Showing 50</option>
                            </select>
                          </li>
                        </ul>
                        <button
                            onClick={handleClear}
                            type="button"
                            className="btnStyleMobile"
                            style={{ borderRadius: `40px` }}
                        >
                          Clear Filter
                        </button>
                      </>
                  )

                  }
                </div>
            ) : null}

            <div className="mainContainer">
              {props.resources_list?.data?.length ? (
                  <div className="resourcesItems">
                    <div className="resourcesItemsWrap" ref={resourceItemWrapRef}>
                      <ul className="featuredResourcesItems">
                        {props.resources_list?.data?.map((item, i) => (
                            <li key={i} className="featuredResource">
                              <NavLink
                                  className="featureImage"
                                  to={`/resources/${item.id}/${item.url.toLowerCase()}`}
                                  onClick={handleClickTop}
                              >
                                <img src={item.thumbnail} alt={item.name} />
                                <span
                                    style={{
                                      background: `${(item.resource_color === "pink/yellow" &&
                                          "#F29EC6") ||
                                      (item.resource_color === "blue/purple" &&
                                          "#777DEF") ||
                                      (item.resource_color === "purple/green" &&
                                          "#A3ACFB") ||
                                      (item.resource_color === "green/yellow" &&
                                          "#7ADBD1") ||
                                      (item.resource_color === "blue/lightBlue" &&
                                          "#54A7D9") ||
                                      (item.resource_color === "green/teal" &&
                                          "#00C998")
                                      }`,
                                    }}
                                    className="borderImage"
                                ></span>
                                <div className="featureMeta">
                            <span className="subtitle">
                              {item.categories?.split(",").map((item) => (
                                  <span key={item}>{item}</span>
                              ))}
                            </span>
                                  <span className="label">New</span>
                                </div>
                              </NavLink>
                              <h4>
                                <NavLink
                                    onClick={handleClickTop}
                                    to={`/resources/${item.id
                                    }/${item.url.toLowerCase()}`}
                                >
                                  {item.name}
                                </NavLink>
                              </h4>
                            </li>
                        ))}
                      </ul>
                      {props.resources_list?.total >
                      props.resources_list?.per_page && (
                          <ReactPaginate
                              containerClassName="paginationWrapper"
                              pageCount={props.resources_list.last_page}
                              pageRangeDisplayed={props.resources_list.per_page}
                              onPageChange={handleChange}
                              nextLabel={<img src={angleRight} alt="right" />}
                              previousLabel={<img src={angleLeft} alt="left" />}
                              forcePage={selected}
                          />
                      )}
                    </div>
                  </div>
              ) : (
                  <div className="no-data-resource">
                    <h5>We apologize! We couldn't find any results.</h5>

                    <button
                        type="button"
                        className="btnStyle"
                        style={{ borderRadius: `40px` }}
                    >
                      Keep Searching
                    </button>
                  </div>
              )}
            </div>
          </div>
        </Element>
        <Footer />
        <FooterBottom />
      </Fragment>
  );
};

const mapStateToProps = (state) => ({
  resources_list: state.resources.resources_list,
  resource_cms: state.cms.resource_cms,
  categories: state.resources.public_cat,
});

export default connect(mapStateToProps, {
  getPublicResourceData,
  getResourceDetailsAction,
  getCategoryData,
})(Resources);
