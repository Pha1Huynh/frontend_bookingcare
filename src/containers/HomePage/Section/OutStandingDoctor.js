import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Slider from "react-slick";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }
  handleViewDetailDoctor = (doctor) => {
    console.log("view info doctor", doctor);
  };
  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;
    return (
      <>
        <div className="section ">
          <div className="section-container">
            <div className="section-header">
              <span>
                <FormattedMessage id="homepage.outstanding-doctor" />
              </span>
              <button>
                <FormattedMessage id="homepage.more-info" />
              </button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {arrDoctors &&
                  arrDoctors.length > 0 &&
                  arrDoctors.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `;
                    let nameEn = `${item.positionData.valueEn},  ${item.firstName} ${item.lastName}`;
                    return (
                      <Link
                        to={`/detail-doctor/${item.id}`}
                        className="img-customize img-doctor"
                        key={index}
                        onClick={() => this.handleViewDetailDoctor(item)}
                      >
                        <div className="img-circle">
                          <img alt="" src={imageBase64} />
                        </div>
                        <p className="doctor-level">
                          {language === LANGUAGES.VI ? nameVi : nameEn}
                        </p>
                        <p className="doctor-specialty">Nam học</p>
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
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => {
      dispatch(actions.fetchTopDoctor());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
