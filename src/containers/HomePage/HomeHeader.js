import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { path } from "./../../utils/constant";
class HomeHeader extends Component {
  changeLanguage = (language) => {
    //call dispatch đã được khai báo
    this.props.changeLanguageAppRedux(language);
    //fire resux actions
  };

  render() {
    let language = this.props.language;
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <Link className="header-logo" to="/home"></Link>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div className="">
                  <b>
                    {/* {" "} */}
                    <FormattedMessage id="homeheader.speciality" />
                  </b>
                </div>
                <div className="sub-title">
                  {/* {" "} */}
                  <FormattedMessage id="homeheader.searchdoctor" />
                </div>
              </div>
              <div className="child-content">
                <div className="">
                  <b>
                    <FormattedMessage id="homeheader.healthfacilities" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeheader.selectroom" />
                </div>
              </div>
              <div className="child-content">
                <div className="">
                  <b>
                    <FormattedMessage id="homeheader.doctor" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeheader.selectdoctor" />
                </div>
              </div>
              <div className="child-content">
                <div className="">
                  <b>
                    <FormattedMessage id="homeheader.fee" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeheader.checkhealth" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>{" "}
                <FormattedMessage id="homeheader.support" />
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="bg-overlay">
              <div className="title1">
                {" "}
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title2">
                {" "}
                <FormattedMessage id="banner.title2" />
              </div>
              <div className="search">
                <i className="fas fa-search"></i>
                <input placeholder="Tìm chuyên khoa khám bệnh" />
              </div>
            </div>
            <div className="options">
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital-alt"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.child1" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital-alt"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.child2" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital-alt"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.child3" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital-alt"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.child4" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital-alt"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.child5" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital-alt"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.child6" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital-alt"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.child7" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital-alt"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.child8" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital-alt"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.child9" />
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language, //Lấy giá trị language từ reducer (appReducer)
    isLoggedIn: state.user.isLoggedIn,
  };
};
//fire action of redux

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => {
      dispatch(changeLanguageApp(language));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
