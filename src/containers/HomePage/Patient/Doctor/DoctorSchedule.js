import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomeHeader";
import "./DoctorSchedule.scss";
import Select from "react-select";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../../utils";
import moment from "moment";
import { getScheduleDoctorByDate } from "../../../../services/userService";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      availableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: {},
    };
  }
  async componentDidMount() {
    let allDays = this.getArrDays();
    if (allDays && allDays.length > 0) {
      let res = await getScheduleDoctorByDate(
        this.props["doctorId"],
        allDays[0].value
      );
      this.setState({
        allDays: allDays,
        availableTime: res.data ? res.data : [],
      });
    }
  }

  async componentDidUpdate(prevProps, prevStates) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDays();
      this.setState({
        allDays: allDays,
      });
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      let allDays = this.getArrDays();
      if (allDays && allDays.length > 0) {
        let res = await getScheduleDoctorByDate(
          this.props["doctorId"],
          allDays[0].value
        );
        this.setState({
          allDays: allDays,
          availableTime: res.data ? res.data : [],
        });
      }
    }
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  getArrDays = () => {
    let { language } = this.props;

    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let labelVi2 = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${labelVi2}`;
          object.label = today;
        } else {
          let label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
          object.label = this.capitalizeFirstLetter(label);
        }
      }
      if (language === LANGUAGES.EN) {
        if (i === 0) {
          let labelEn2 = moment(new Date()).locale("en").format("DD/MM");
          let today = `Today - ${labelEn2}`;
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("dddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();

      allDays.push(object);
    }
    return allDays;
  };
  handleOnchangeSelect = async (e) => {
    console.log("check props", this.props);
    if (this.props["doctorId"] && this.props["doctorId"] !== "") {
      let date = e.target.value;
      let doctorId = this.props["doctorId"];
      console.log("check doctor id", doctorId);
      let res = await getScheduleDoctorByDate(doctorId, date);
      console.log("check time schedule", res);
      if (res && res.errCode === 0) {
        this.setState({
          availableTime: res.data ? res.data : [],
        });
      } else {
      }
    }
  };
  handleClickScheduleTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time,
    });
  };
  closeBookingModal = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };
  render() {
    let { allDays, availableTime, isOpenModalBooking, dataScheduleTimeModal } =
      this.state;
    let { language } = this.props;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select className="" onChange={(e) => this.handleOnchangeSelect(e)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calender">
              <span>
                <i className="fas fa-calendar-alt"></i>{" "}
                <FormattedMessage id="patient.detail-doctor.schedule" />
              </span>
            </div>

            {availableTime && availableTime.length > 0 ? (
              <>
                <div className="time-content">
                  {availableTime.map((item, index) => {
                    let timeDisplay =
                      language === LANGUAGES.VI
                        ? item.timeTypeData.valueVi
                        : item.timeTypeData.valueEn;
                    return (
                      <button
                        key={index}
                        onClick={() => this.handleClickScheduleTime(item)}
                        className={`btn btn-secondary ${
                          language === LANGUAGES.VI ? "btn-vi" : "btn-en"
                        }`}
                      >
                        {timeDisplay}
                      </button>
                    );
                  })}
                </div>
                <div className="book-free">
                  <span>
                    <FormattedMessage id="patient.detail-doctor.choose" />
                    <i className="fas fa-hand-point-up"></i>
                    <FormattedMessage id="patient.detail-doctor.book-free" />
                  </span>
                </div>
              </>
            ) : (
              <div className="no-schedule">
                <FormattedMessage id="patient.detail-doctor.no-schedule" />
              </div>
            )}
          </div>
        </div>
        <BookingModal
          isOpenModal={isOpenModalBooking}
          closeBookingModal={this.closeBookingModal}
          dataTime={dataScheduleTimeModal}
        />
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
