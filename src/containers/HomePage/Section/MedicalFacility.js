import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { getAllClinic } from "../../../services/userService";
import "./MedicalFacility.scss";
class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      });
    }
  }
  render() {
    let { dataClinics } = this.state;
    return (
      <>
        <div className="section medical-facilites-container">
          <div className="section-container">
            <div className="section-header">
              <span>Cơ sở y tế nổi bật</span>
              <button>Xem thêm</button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {dataClinics &&
                  dataClinics.length > 0 &&
                  dataClinics.map((item, index) => {
                    return (
                      <Link
                        className="img-customize"
                        key={index}
                        to={`detail-clinic/${item.id}`}
                      >
                        <img alt="" src={item.image} />
                        <div className="clinic-name">{item.name}</div>
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
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
