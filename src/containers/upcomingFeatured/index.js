import { Field, Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Helmet } from "react-helmet";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import { Element } from "react-scroll";
import Cookies from "universal-cookie";
import * as Yup from "yup";
import menuBg from "../../assets/images/bg/menu/home.svg";
import upcomingBg from "../../assets/images/bg/upcoming.svg";
import angleLeft from "../../assets/images/icons/angle-left.svg";
import angleRight from "../../assets/images/icons/angle-right.svg";
import like from "../../assets/images/icons/like.svg";
import plane from "../../assets/images/icons/plane.svg";
import unlike from "../../assets/images/icons/unlike.svg";
import Footer from "../../components/footer";
import FooterBottom from "../../components/footerBottom";
import TextInput from "../../components/formfields/InputField";
import SubmitLoader from "../../components/SubmitLoader";
// components
import Header from "../../components/header";
import LeftSideMenu from "../../components/leftmenu";
import LoginModal from "../../components/loginModal";
import MainMenu from "../../components/mainMenu";
import SuccessModal from "../../components/successModal";
import UpcomingHero from "../../components/upcoming/hero";
import { getUpcomingDetailsAction } from "../App/actions";

import { requestFeatureAction } from "../requestAFeature/actions";
import { addVoteAction, getPublicFeatureListAction } from "./actions";

import "./style.scss";

const cookie = new Cookies();

const validationSchema = Yup.object({
  title: Yup.string().required("title can not be empty"),
  description: Yup.string().required("description can not be empty"),
});
const UpcomingFeatured = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isModalLogin, setIsModalLogin] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selected, setSelected] = useState(0);
  const user_token = cookie.get("user_token");

  const initialState = {
    title: "",
    description: "",
    featureIdea: true,
  };

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <li key={file.name}>
      <img src={file.preview} />
    </li>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  const handleCloseMenuMenu = () => {
    setOpenMenu(false);
  };

  const handleSubmit = (values, actions) => {
    const data = {
      idea: values.featureIdea,
      title: values.title,
      description: values.description,
      image: files,
    };

    if (user_token) {
      if (!props.user_info?.email_verified_at) {
        props.history.push("/confirm-email");
      } else if (props.user_info?.is_complete === "0") {
        props.history.push("/account-complete");
      } else {
        props.requestFeatureAction(data, actions, setFiles, setSuccess);
      }
    } else {
      setIsModalLogin(true);
    }
  };

  useEffect(() => {
    props.getPublicFeatureListAction(`paginate=3`);
    props.getUpcomingDetailsAction();
  }, []);
  const handleAddVote = (post_id, type) => {
    const data = {
      post_id: post_id,
      vote: type,
    };
    if (user_token) {
      props.addVoteAction(data);
    } else {
      setIsModalLogin(true);
    }
  };
  const handleChange = (value) => {
    setSelected(value.selected);
    props.getPublicFeatureListAction(`page=${value.selected + 1}&paginate=3`);
  };
  return (
    <Fragment>
      <Helmet>
        <title>{`${props.upcoming?.name}  - Clarity Cooperative`}</title>
      </Helmet>
      <LeftSideMenu
        isOpen={openMenu}
        openMenu={handleOpenMenu}
        className="sidebarShadowChange"
        title="UPCOMING FEATURES"
      />
      <MainMenu
        closeMenu={handleCloseMenuMenu}
        title="NAVIGATE"
        bgImage={menuBg}
        className={openMenu ? "active" : ""}
      />
      <Header
        openMenu={handleOpenMenu}
        className="headerStyleWhite"
        logoWhite={true}
      />
      <UpcomingHero data={props.upcoming} />
      <Element name="test1">
        <section className="upcomingFeaturedArea">
          <ul className="upcomingFeaturedItems">
            {props.feature_list?.data?.map((item) => (
              <li key={item.id} className="upcomingFeaturedWrap">
                <div className="upcomingFeaturedImg">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="upcomingFeaturedContent">
                  <div className="upcomingFeatured">
                    <span>{item.coming_in}</span>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                  </div>
                  <ul className="upcomingFeaturedLike">
                    <li>
                      <button
                        onClick={() => handleAddVote(item.id, 1)}
                        className="like"
                      >
                        <img src={like} alt="like" />
                        {item.up_vote > 0 && (
                          <span className="value">{item.up_vote}</span>
                        )}
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleAddVote(item.id, 2)}
                        className="unlike"
                      >
                        <img src={unlike} alt="unlike" />
                        {item.down_vote > 0 && (
                          <span className="value">{item.down_vote}</span>
                        )}
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            ))}
          </ul>
          <div className="paginationFeatured">
            {props.feature_list?.total > props.feature_list?.per_page && (
              <ReactPaginate
                containerClassName="paginationWrapper"
                pageCount={
                  props.feature_list.total / props.feature_list.per_page
                }
                pageRangeDisplayed={props.feature_list.per_page}
                onPageChange={handleChange}
                nextLabel={<img src={angleRight} alt="right" />}
                previousLabel={<img src={angleLeft} alt="left" />}
                forcePage={selected}
              />
            )}
          </div>
        </section>
      </Element>
      {user_token ? (
        <section
          className={`usefulFeatureArea2Style usefulFeatureArea`}
          style={{
            background: `url(${upcomingBg}) no-repeat center center / cover`,
          }}
        >
          <div className="usefulFeatureTitle">
            <h2>{props.upcoming?.useful_title}</h2>
            <p>{props.upcoming?.useful_paragraph}</p>
          </div>

          <Formik
            initialValues={initialState}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ values, handleChange, handleBlur }) => {
              return (
                <Form className="usefulFeatureForm">
                  <div className="usefulFeatureFormBG">
                    <Field
                      label="Title Of Feature*"
                      id="title"
                      name="title"
                      component={TextInput}
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter Title"
                    />
                    <Field
                      label="Description Of Feature*"
                      id="description"
                      name="description"
                      component={TextInput}
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Describe your idea in as much detail as you can"
                    />
                    <div className="inputStyle">
                      <label>
                        Do you have and example of a similar feature? Send us a
                        screenshot!
                      </label>
                      <div {...getRootProps({ className: "dropzoneStyle" })}>
                        <input {...getInputProps()} />
                        <p>Drag & Drop files here to upload.</p>
                        <button type="button">Browse</button>
                      </div>
                      <ul className="thumbImages">{thumbs}</ul>
                    </div>
                    <div className="inputStyle mb-0">
                      <label>Can we call you about your feature idea?*</label>
                      <label className="switch">
                        <Field name="featureIdea" type="checkbox" />
                        <span className="slider">
                          <span className={`yes ${values.featureIdea && 'active'}`}>Yes</span>
                          <span className={`no ${!values.featureIdea && 'active'}`}>No</span>
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="sendbtn"
                      disabled={props.meta.isLoading}
                    >
                      {props.meta.isLoading ? (
                        <>
                          Sending... <SubmitLoader />
                        </>
                      ) : (
                        <>
                          Send It <img src={plane} alt="Send It" />
                        </>
                      )}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </section>
      ) : null}

      {/* <UsefulFeature bgImg={upcomingBg} /> */}
      <Footer />
      <FooterBottom />
      <LoginModal
        isOpen={isModalLogin}
        onClosed={() => setIsModalLogin(false)}
        modal={setIsModalLogin}
      />
      <SuccessModal
        isOpen={success}
        onClosed={() => setSuccess(false)}
        title="Successfully Submitted Request A Feature"
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user_info: state.my_account.user_info,
  feature_list: state.feature.feature_list,
  upcoming: state.cms.upcoming,
  meta: state.meta,
});

export default connect(mapStateToProps, {
  requestFeatureAction,
  getPublicFeatureListAction,
  addVoteAction,
  getUpcomingDetailsAction,
})(UpcomingFeatured);
