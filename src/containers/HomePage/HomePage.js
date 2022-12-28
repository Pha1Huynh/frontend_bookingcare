import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import MedicalFacility from "./Section/MedicalFacility";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import HandBook from "./Section/HandBook";
import HomeFooter from "./HomeFooter";
import About from "./Section/About";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomePage.scss";
import imgSpeciality from "../../assets/sectionSpeciality/co-xuong-khop.jpg";
import imgFacilities from "../../assets/sectionFacilities/bv-an-viet1.jpg";
import imgDoctor from "../../assets/sectionDoctor/anh-dai-dien-bs.jpg";
import imgHandBook from "../../assets/handBook/hb1.jpg";

class HomePage extends Component {
  handleAfterChange = (index, dontAnimate) => {
    console.log("check slider", index);
  };
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      // slickGoTo: this.handleAfterChange,
    };
    return (
      <div>
        <HomeHeader isShowBanner={true} />
        <Specialty settings={settings} src={imgSpeciality} />
        <MedicalFacility settings={settings} src={imgFacilities} />
        <OutStandingDoctor settings={settings} src={imgDoctor} />
        <HandBook settings={settings} src={imgHandBook} />
        <About />
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
