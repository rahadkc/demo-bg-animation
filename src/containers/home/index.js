import React, { Fragment, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import loadable from '@loadable/component'
// images
import menuBg from "../../assets/images/bg/menu/home.svg";
import Footer from "../../components/footer";
import FooterBottom from "../../components/footerBottom";
// components
import Header from "../../components/header";
import Hero from "../../components/home/hero";
import LeftSideMenu from "../../components/leftmenu";
import MainMenu from "../../components/mainMenu";
import SignupModal from "../../components/signupModal";
import { getPublicFeatureListAction } from "../upcomingFeatured/actions";
import { getHomeDataAction } from "./actions";
import "./style.scss";
import Transition from "../../components/transition";

const About = loadable(() => import('../../components/home/about'));
const Company = loadable(() => import('../../components/home/company'))
const Horizon = loadable(() => import('../../components/home/horizon'));
const Membership = loadable(() => import("../../components/home/membership"));
const FeaturedResources = loadable(() => import("../../components/home/resources"));
const Service = loadable(() => import("../../components/home/service"));
const WhoPerfect = loadable(() => import("../../components/home/whoPerfect"));

const HomePage = (props) => {
    const cookie = new Cookies();

    const [openMenu, setOpenMenu] = useState(false);
    const [isModal, setIsModal] = useState(false);

    const handleOpenMenu = () => {
        setOpenMenu(!openMenu);
    };

    const handleCloseMenuMenu = () => {
        setOpenMenu(false);
    };

    const handleOpenSignupModal = () => {
        if (cookie.get("user_token")) {
            toast.error("you are already logged in");
        } else {
            setIsModal(true);
        }
    };

    useEffect(() => {
        props.getHomeDataAction();
        props.getPublicFeatureListAction(`paginate=3`);
    }, []);

    return (
        <Fragment>
            <Helmet>
                <title>{`${props.home_data?.name} - Clarity Cooperative`}</title>
            </Helmet>

            <Transition/>

            <LeftSideMenu isOpen={openMenu} openMenu={handleOpenMenu} title="Clarity Cooperative"/>
            <MainMenu
                closeMenu={handleCloseMenuMenu}
                title="NAVIGATE"
                bgImage={menuBg}
                className={openMenu ? "active" : ""}
            />
            <Header
                openMenu={handleOpenMenu}
                className="headerStyleEmpty"
                blackLogo={true}
            />

            <Hero openSignup={handleOpenSignupModal} data={props.home_data} />

            <About openSignup={handleOpenSignupModal} data={props.home_data} />
            <Service openSignup={handleOpenSignupModal} data={props.home_data} />
            <WhoPerfect openSignup={handleOpenSignupModal} data={props.home_data} />
            <FeaturedResources />
            <Membership openSignup={handleOpenSignupModal} data={props.home_data} />
            <Horizon data={props.home_data} feature_list={props.feature_list} />
            <Company openSignup={handleOpenSignupModal} data={props.home_data} />


            <Footer />
            <FooterBottom />
            <SignupModal isOpen={isModal} onClosed={() => setIsModal(false)} />
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    home_data: state.home.home_data,
    feature_list: state.feature.feature_list,
});

export default connect(mapStateToProps, {
    getHomeDataAction,
    getPublicFeatureListAction,
})(withRouter(HomePage));
