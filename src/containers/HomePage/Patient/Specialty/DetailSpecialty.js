import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomeHeader";
import "./DetailSpecialty.scss";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { getDetailSpecialtyById } from "../../../../services/userService";
import _ from "lodash";
import { getAllCodeService } from "../../../../services/userService";
import { LANGUAGES } from "../../../../utils";
import { Link } from "react-router-dom";
class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [47, 48],
      dataDetailSpecialty: {},
      listProvince: [],
    };
  }

  async componentDidMount() {
    let { listProvince } = this.state;
    if (listProvince && listProvince.length > 0) {
      if (listProvince[0].keyMap !== "ALL") {
        listProvince.unshift({
          keyMap: "ALL",
          type: "PROVINCE",
          valueEn: "All",
          valueVi: "Toàn quốc",
        });
        this.setState({
          listProvince: listProvince,
        });
      }
    }
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      let res = await getDetailSpecialtyById({
        id: id,
        location: "ALL",
      });

      let resProvince = await getAllCodeService("PROVINCE");

      if (res && res.errCode === 0 && resProvince.errCode === 0) {
        let data = res.data;

        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: res.data.doctorSpecialty,
          listProvince: resProvince.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevStates) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleOnChangeSelect = async (e) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let location = e.target.value;
      let res = await getDetailSpecialtyById({
        id: id,
        location: location,
      });

      let data = res.data;

      this.setState({
        dataDetailSpecialty: res.data,
        arrDoctorId: res.data.doctorSpecialty,
      });
    }
  };
  render() {
    let { language } = this.props;
    let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;

    if (listProvince && listProvince.length > 0) {
      if (listProvince[0].keyMap !== "ALL") {
        listProvince.unshift({
          keyMap: "ALL",
          type: "PROVINCE",
          valueEn: "All",
          valueVi: "Toàn quốc",
        });
      }
    }
    return (
      <div className="detail-specialty-main">
        <HomeHeader />
        <div className="detail-specialty-container">
          <div className="description-speciaty">
            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
              <div
                dangerouslySetInnerHTML={{
                  __html: dataDetailSpecialty.descriptionHTML,
                }}
              ></div>
            )}
          </div>
          <div className="search-sp-doctor">
            <select
              onChange={(e) => this.handleOnChangeSelect(e)}
              className="form-control w-25"
            >
              {listProvince &&
                listProvince.length > 0 &&
                listProvince.map((item, index) => {
                  return (
                    <option key={index} value={item.keyMap}>
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </option>
                  );
                })}
            </select>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
