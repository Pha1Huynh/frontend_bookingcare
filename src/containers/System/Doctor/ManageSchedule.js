import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { dateFormat, LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import { saveBulkScheduleDoctor } from "../../../services/userService";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allDoctors: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctor();
    this.props.fetchAllScheduleTime();
  }
  buildDataInputSelect = (inputData) => {
    let result = [];
    let language = this.props.language;
    if (inputData && inputData.length > 0) {
      inputData.forEach((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  componentDidUpdate(prevProps, prevStates) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        allDoctors: dataSelect,
      });
    }

    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data.map((item) => {
          item.isSelected = false;
          return item;
        });
      }
      this.setState({
        rangeTime: data,
      });
    }

    // if (prevProps.language !== this.props.language) {
    //   let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
    //   this.setState({
    //     allDoctors: dataSelect,
    //   });
    // }
  }
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });
  };
  handleOnchangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  handleClickButtonTime = (time) => {
    let { rangeTime } = this.state;

    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };
  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    let result = [];
    if (!currentDate) {
      toast.error("ERROR, Invalid Date!");
      return;
    }
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("ERROR, Invalid doctor select!");
      return;
    }
    // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    // let formatedDate = moment(currentDate).unix();
    let formatedDate = new Date(currentDate).getTime();
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((item) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formatedDate;
          object.timeType = item.keyMap;
          result.push(object);
          return true;
        });
      } else {
        toast.error("ERROR, Invalid selected time!");
        return;
      }
    }
    let res = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      date: formatedDate,
    });
    if (res && res.errCode === 0) {
      toast.success("Success, Save success");
    } else {
      toast.error("ERROR, Can not book the schedule");
    }
  };
  render() {
    let { rangeTime } = this.state;
    let { language } = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

    return (
      <>
        <div className="manage-schedule-container">
          <div className="m-s-title">
            <FormattedMessage id="manage-schedule.title" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choose-doctor" />
                </label>
                <Select
                  value={this.state.selectedDoctor}
                  onChange={this.handleChangeSelect}
                  options={this.state.allDoctors}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choose-date" />
                </label>
                <DatePicker
                  className="form-control"
                  onChange={this.handleOnchangeDatePicker}
                  minDate={yesterday}
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12 pick-hour-container">
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((item, index) => {
                    return (
                      <button
                        onClick={() => this.handleClickButtonTime(item)}
                        key={index}
                        className={
                          language === LANGUAGES.VI
                            ? `btn btn-md btn-outline-info ${
                                item.isSelected === true ? "active" : ""
                              }`
                            : `btn btn-sm btn-outline-info py-3 ${
                                item.isSelected === true ? "active" : ""
                              }`
                        }
                      >
                        {language === LANGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </button>
                    );
                  })}
              </div>
              <button
                className="btn btn-primary"
                onClick={() => this.handleSaveSchedule()}
              >
                <FormattedMessage id="manage-schedule.save" />
              </button>
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
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
