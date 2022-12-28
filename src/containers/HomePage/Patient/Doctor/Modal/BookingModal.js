import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../../../components/Input/DatePicker";
import * as actions from "../../../../../store/actions";
import { LANGUAGES } from "../../../../../utils";
import Select from "react-select";
import { postPatientBookAppoinent } from "../../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";
import localization from "moment/locale/vi";
import LoadingOverlay from "react-loading-overlay";
class BookingMModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHideModal: false,
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      selectedGender: "",
      genders: "",
      doctorId: "",
      timeType: "",
      isShowLoading: false,
    };
  }
  buidDataGender = (data) => {
    let result = [];
    let language = this.props.language;

    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };
  async componentDidMount() {
    this.props.getGenders();
  }

  async componentDidUpdate(prevProps, prevStates) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buidDataGender(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buidDataGender(this.props.genders),
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      let doctorId = "";
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }

  handleOnchangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };
  handleOnchangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedGender: selectedOption });
  };
  handleConfirmBooking = async () => {
    this.setState({
      isShowLoading: true,
    });
    let {
      fullName,
      phoneNumber,
      email,
      address,
      reason,
      birthday,
      selectedGender,
      doctorId,
      genders,
      timeType,
    } = this.state;
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let doctorName = this.buildDoctorName(this.props.dataTime);

    let res = await postPatientBookAppoinent({
      fullName: fullName,
      phoneNumber: phoneNumber,
      email: email,
      address: address,
      reason: reason,
      date: this.props.dataTime.date,
      birthday: date,
      selectedGender: selectedGender.value,
      doctorId: doctorId,
      timeType: timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });
    this.setState({
      isShowLoading: false,
    });
    if (res && res.errCode === 0) {
      toast.success("Booking  a new appointment success");
      this.props.closeBookingModal();
    } else {
      toast.error("ERROR,Booking  a new appointment error");
    }
  };
  buildTimeBooking = (dataTime) => {
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
      return `${time} - ${date}`;
    }
    return "";
  };
  buildDoctorName = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.dataTime) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.doctorData.lastName} - ${dataTime.doctorData.firstName}`
          : `${dataTime.doctorData.firstName} - ${dataTime.doctorData.lastName}`;
      return name;
    }
    return "";
  };
  render() {
    let { isOpenModal, closeBookingModal, dataTime } = this.props;
    let doctorId = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }
    return (
      <LoadingOverlay
        active={this.state.isShowLoading}
        spinner
        text="Loading..."
      >
        {" "}
        <Modal
          isOpen={isOpenModal}
          toggle={() => closeBookingModal()}
          className={"booking-modal-container"}
          size="lg"
          centered
          //   backdrop={true}
        >
          <ModalHeader toggle={() => closeBookingModal()}>
            <FormattedMessage id="patient.booking-modal.title" />
          </ModalHeader>
          <ModalBody>
            <div className="doctor-info">
              <ProfileDoctor
                doctorId={doctorId}
                isShowDescriptionDoctor={false}
                dataTime={dataTime}
              />
            </div>

            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.fullname" />
                </label>
                <input
                  className="form-control"
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "fullName")
                  }
                  value={this.state.fullName}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.phoneNumber" />
                </label>
                <input
                  className="form-control"
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "phoneNumber")
                  }
                  value={this.state.phoneNumber}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.email" />
                </label>
                <input
                  className="form-control"
                  onChange={(event) => this.handleOnchangeInput(event, "email")}
                  value={this.state.email}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.address" />
                </label>
                <input
                  className="form-control"
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "address")
                  }
                  value={this.state.address}
                />
              </div>
              <div className="col-12 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.reason" />
                </label>
                <input
                  className="form-control"
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "reason")
                  }
                  value={this.state.reason}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.gender" />
                </label>
                <Select
                  value={this.state.selectedGender}
                  onChange={this.handleChangeSelect}
                  options={this.state.genders}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.birthday" />
                </label>
                <DatePicker
                  className="form-control"
                  onChange={this.handleOnchangeDatePicker}
                  value={this.state.birthday}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.handleConfirmBooking()}>
              <FormattedMessage id="patient.booking-modal.acept" />
            </Button>{" "}
            <Button color="secondary" onClick={() => closeBookingModal()}>
              <FormattedMessage id="patient.booking-modal.cancel" />
            </Button>
          </ModalFooter>
        </Modal>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingMModal);
