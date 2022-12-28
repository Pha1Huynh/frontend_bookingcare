/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HandBook extends Component {
  render() {
    return (
      <>
        <div className="section section-bg">
          <div className="section-container">
            <div className="section-header">
              <span>Cẩm nang</span>
              <button>Xem thêm</button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="img-customize">
                  <img alt="" src={this.props.src} />
                  <div>Cẩm nang 1</div>
                </div>
                <div className="img-customize">
                  <img alt="" src={this.props.src} />
                  <div>Cẩm nang 2</div>
                </div>
                <div className="img-customize">
                  <img alt="" src={this.props.src} />
                  <div>Cẩm nang 3</div>
                </div>
                <div className="img-customize">
                  <img alt="" src={this.props.src} />
                  <div>Cẩm nang 4</div>
                </div>
                <div className="img-customize">
                  <img alt="" src={this.props.src} />
                  <div>Cẩm nang 5</div>
                </div>
                <div className="img-customize">
                  <img alt="" src={this.props.src} />
                  <div>Cẩm nang 6</div>
                </div>
              </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
