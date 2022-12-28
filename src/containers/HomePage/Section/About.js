/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { connect } from "react-redux";
import { path } from "./../../../utils/constant";

class About extends Component {
  render() {
    return (
      <>
        <div className="section section-about">
          <div className="section-about-header">
            Truyền thông nói gì về BOOKING CARE
          </div>
          <div className="section-about-content">
            <div className="content-left">
              <iframe
                width="1268"
                height="713"
                src="https://www.youtube.com/embed/nOh7h67IxJs"
                title="Hướng Dẫn Đặt Lịch Khám Qua BookingCare"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="content-right">
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable.
              </p>
            </div>
          </div>
        </div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
