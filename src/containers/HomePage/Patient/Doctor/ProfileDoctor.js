import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { FormattedMessage } from "react-intl";
import { getProfileDoctorById } from "../../../../services/userService";
import { LANGUAGES } from "../../../../utils";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";
import localization from "moment/locale/vi";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let id = this.props.doctorId;
    let data = await this.getInfoDoctor(id);
  }
  getInfoDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
        this.setState({
          dataProfile: result,
        });
      }
    }
  };
  async componentDidUpdate(prevProps, prevStates) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      let id = this.props.doctorId;
      let result = this.getInfoDoctor(id);
    }
  }

  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.dataTime) {
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("dddd - MM/DD/YYYY");
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      return (
        <>
          <div>
            {time} {date}
          </div>
          <div>
            <FormattedMessage id="patient.booking-modal.priceBooking" />
          </div>
        </>
      );
    }
    return <></>;
  };
  render() {
    let { dataProfile } = this.state;
    let { language, isShowDescriptionDoctor, dataTime } = this.props;
    let nameEn = "",
      nameVi = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName} `;
      nameEn = `${dataProfile.positionData.valueEn},  ${dataProfile.firstName} ${dataProfile.lastName}`;
    }
    return (
      <div className="profile-doctor-container">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                dataProfile.image && dataProfile.image ? dataProfile.image : ""
              })`,
            }}
          ></div>

          <div className="content-right">
            <div className="up">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className="down">
              {isShowDescriptionDoctor ? (
                <>
                  {dataProfile.Markdown && dataProfile.Markdown.description && (
                    <span>{dataProfile.Markdown.description}</span>
                  )}
                </>
              ) : (
                <>{this.renderTimeBooking(dataTime)}</>
              )}
            </div>
          </div>
        </div>
        <div className="price">
          {" "}
          <FormattedMessage id="patient.booking-modal.price" />
          {dataProfile &&
          dataProfile.Doctor_Info &&
          language === LANGUAGES.VI ? (
            <NumberFormat
              value={dataProfile.Doctor_Info.priceTypeData.valueVi}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" VND"}
            />
          ) : (
            ""
          )}
          {dataProfile &&
          dataProfile.Doctor_Info &&
          language === LANGUAGES.EN ? (
            <NumberFormat
              value={dataProfile.Doctor_Info.priceTypeData.valueEn}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" $"}
            />
          ) : (
            ""
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
