import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import moment from "moment";
import RemedyModal from "./RemedyModal";
import DatePicker from "../../../components/Input/DatePicker";
import { getAllPatientForDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { postSendRemedy } from "../../../services/userService";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      dataPatient: [],
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    this.getDataPatient();
  }
  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = moment(currentDate).startOf("day").valueOf();
    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formatedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };
  async componentDidUpdate(prevProps, prevStates) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleOnchangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };
  closeModal = () => {
    this.setState({
      isOpenRemedyModal: false,
    });
  };

  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: { ...data },
    });
  };
  sendRemedy = async (dataFromModal) => {
    let { dataModal } = this.state;

    this.setState({
      isOpenRemedyModal: false,
      isShowLoading: true,
    });
    let res = await postSendRemedy({
      ...dataFromModal,
      ...dataModal,
      language: this.props.language,
    });
    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success("Send remedy succedd");
      this.getDataPatient();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("Send remedy failed, something wrong");
    }
  };
  render() {
    let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
    let { language } = this.props;
    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
          <div className="manage-patient-container">
            <div className="m-p-title">Quản lý bệnh nhân khám bệnh</div>
            <div className="manage-patient-body row pl-3">
              <div className="col-4 form-group">
                <label>Chọn ngày khám</label>
                <DatePicker
                  className="form-control"
                  onChange={this.handleOnchangeDatePicker}
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12">
                <table>
                  <tbody>
                    <tr>
                      <th>STT</th>
                      <th>Thời gian</th>
                      <th>Họ và tên</th>
                      <th>Địa chỉ</th>
                      <th>Giới tính</th>
                      <th>Action</th>
                    </tr>
                    {dataPatient && dataPatient.length > 0 ? (
                      dataPatient.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index}</td>
                            <td>
                              {language === LANGUAGES.VI
                                ? item.timeTypeDataPatient.valueVi
                                : item.timeTypeDataPatient.valueEn}
                            </td>
                            <td>{item.patientData.firstName}</td>
                            <td>{item.patientData.address}</td>
                            <td>
                              {language === LANGUAGES.VI
                                ? item.patientData.genderData.valueVi
                                : item.patientData.genderData.valueEn}
                            </td>
                            <td>
                              <button
                                className="btn btn-primary mr-2"
                                onClick={() => this.handleBtnConfirm(item)}
                              >
                                Xác nhận
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td className="text-center" colSpan="6">
                          No data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <RemedyModal
            isOpen={isOpenRemedyModal}
            dataModal={dataModal}
            closeModal={this.closeModal}
            sendRemedy={this.sendRemedy}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
