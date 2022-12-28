/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { getAllSpecialty } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }
  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data,
      });
    }
    console.log("check all state", this.state);
  }
  render() {
    let { dataSpecialty } = this.state;
    return (
      <>
        <div className="section section-bg">
          <div className="section-container">
            <div className="section-header">
              <span>
                <FormattedMessage id="homepage.specialty" />
              </span>
              <button>
                <FormattedMessage id="homepage.more-info" />
              </button>
            </div>

            <div className="section-body">
              <Slider {...this.props.settings}>
                {dataSpecialty &&
                  dataSpecialty.length > 0 &&
                  dataSpecialty.map((item, index) => {
                    return (
                      <Link
                        className="img-customize"
                        key={index}
                        to={`/detail-specialty/${item.id}`}
                      >
                        <img alt="" src={item.image} />
                        <div className="specialty-name">{item.name}</div>
                      </Link>
                    );
                  })}
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
