import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import { LANGUAGES } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import { getExtraInforDoctorById } from "../../../../services/userService";
import NumberFormat from "react-number-format";
class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfo: {},
    };
  }
  getExtraInfo = async () => {
    let data = await getExtraInforDoctorById(this.props.doctorId);
    if (data && data.errCode === 0) {
      this.setState({
        extraInfo: data.data,
      });
    }
  };
  async componentDidMount() {
    this.getExtraInfo();
  }

  async componentDidUpdate(prevProps, prevStates) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      this.getExtraInfo();
    }
  }

  showHideDetailInfo = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };
  render() {
    let { isShowDetailInfor, extraInfo } = this.state;
    let { language } = this.props;
    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="text-address">
            <FormattedMessage id="patient.extra-infor-doctor.text-address" />
          </div>
          <div className="name-clinic">
            {extraInfo && extraInfo.nameClinic
              ? extraInfo.nameClinic
              : "Chua co phong kham"}
          </div>
          <div className="detail-address">
            {extraInfo && extraInfo.addressClinic
              ? extraInfo.addressClinic
              : "Chua co dia chi"}
          </div>
        </div>
        <div className="content-down">
          {isShowDetailInfor === false ? (
            <div>
              <FormattedMessage id="patient.extra-infor-doctor.price" />:{" "}
              {extraInfo && extraInfo.priceTypeData ? (
                language === LANGUAGES.VI ? (
                  <NumberFormat
                    value={extraInfo.priceTypeData.valueVi}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" VND"}
                  />
                ) : (
                  <NumberFormat
                    value={extraInfo.priceTypeData.valueEn}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" $"}
                  />
                )
              ) : (
                ""
              )}
              <span
                className="show-hide-button"
                onClick={() => this.showHideDetailInfo(true)}
              >
                . <FormattedMessage id="patient.extra-infor-doctor.detail" />
              </span>
            </div>
          ) : (
            <>
              <div className="title-price">
                {" "}
                <FormattedMessage id="patient.extra-infor-doctor.price" />
              </div>
              <div className="detail-infor">
                <div className="price">
                  <span className="left">
                    {" "}
                    <FormattedMessage id="patient.extra-infor-doctor.price" />
                  </span>
                  <span className="right">
                    {" "}
                    {extraInfo && extraInfo.priceTypeData ? (
                      language === LANGUAGES.VI ? (
                        <NumberFormat
                          value={extraInfo.priceTypeData.valueVi}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={" VND"}
                        />
                      ) : (
                        <NumberFormat
                          value={extraInfo.priceTypeData.valueEn}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={" $"}
                        />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </div>
                <div className="first-payment">
                  <FormattedMessage id="patient.extra-infor-doctor.first-price" />
                </div>
                <div className="second-payment">
                  <FormattedMessage id="patient.extra-infor-doctor.second-price" />
                </div>
                <div className="method-payment">
                  {extraInfo && extraInfo.note
                    ? extraInfo.note
                    : "Phòng khám có thanh toán bằng hình thức tiền mặt và quẹt thẻ"}
                </div>
              </div>
              <div
                className="show-hide-button mt-2"
                onClick={() => this.showHideDetailInfo(false)}
              >
                <FormattedMessage id="patient.extra-infor-doctor.hide" />
              </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
