import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomeHeader";
import "./DetailClinic.scss";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { getDetailClinicById } from "../../../../services/userService";
import _ from "lodash";
import { getAllCodeService } from "../../../../services/userService";
import { LANGUAGES } from "../../../../utils";
import { Link } from "react-router-dom";
class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [47, 48],
      dataDetailClinic: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      let res = await getDetailClinicById({
        id: id,
      });
      console.log("check res detail clinic", res);
      let resProvince = await getAllCodeService("PROVINCE");

      if (res && res.errCode === 0 && resProvince.errCode === 0) {
        let data = res.data;

        this.setState({
          dataDetailClinic: res.data,
          arrDoctorId: res.data.doctorClinic,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevStates) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { language } = this.props;
    let { arrDoctorId, dataDetailClinic } = this.state;

    return (
      <div className="detail-specialty-main">
        <HomeHeader />
        <div className="detail-specialty-container">
          <div className="description-speciaty">
            {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
              <>
                <h3>{dataDetailClinic.name}</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataDetailClinic.descriptionHTML,
                  }}
                ></div>
              </>
            )}
          </div>
          <div className="search-sp-doctor"></div>
          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <>
                  <div className="each-doctor" key={index}>
                    <div className="left">
                      <ProfileDoctor
                        doctorId={item.doctorId}
                        isShowDescriptionDoctor={true}
                      />
                      <Link
                        to={`/detail-doctor/${item.doctorId}`}
                        className="ml-4"
                      >
                        Xem thêm
                      </Link>
                    </div>
                    <div className="right">
                      {" "}
                      <div>
                        <DoctorSchedule doctorId={item.doctorId} key={index} />;
                        <DoctorExtraInfo doctorId={item.doctorId} />
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
