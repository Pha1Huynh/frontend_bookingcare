/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { connect } from "react-redux";

class HomeFooter extends Component {
  render() {
    return (
      <>
        <div className="home-footer">
          <p>
            &copy; 2022 PhatHuynh. More information, please visit my profile
            <a target="_blank" href="https://github.com/Pha1Huynh">
              {" "}
              Click here
            </a>
          </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
