import React, { Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import "./style.scss";

// images
import menuBg from "../../assets/images/bg/menu/home.svg";
import FooterBottom from "../../components/footerBottom";

// components
import Header from "../../components/header";
import HeroSection from "../../components/insurancepricing/HeroSection";
import Plans from "../../components/insurancepricing/Plans";
import LeftSideMenu from "../../components/leftmenu";
import MainMenu from "../../components/mainMenu";
import SignupModal from "../../components/signupModal";
import Disclaimer from "../../components/disclaimer";

const Index = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [isModal, setIsModal] = useState(false);

    const handleOpenMenu = () => {
        setOpenMenu(!openMenu);
    };

    const handleCloseMenuMenu = () => {
        setOpenMenu(false);
    };

    return (
        <Fragment>
            <Helmet>
                <title>Insurance Membership - Clarity Cooperative</title>
            </Helmet>
            <LeftSideMenu
                isOpen={openMenu}
                openMenu={handleOpenMenu}
                title="Clarity Cooperative"
            />
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

            <HeroSection />
            <Plans />
            <Disclaimer />
            {/* <Footer /> */}
            <FooterBottom />
            <SignupModal isOpen={isModal} onClosed={() => setIsModal(false)} />
        </Fragment>
    );
};

export default withRouter(Index);
