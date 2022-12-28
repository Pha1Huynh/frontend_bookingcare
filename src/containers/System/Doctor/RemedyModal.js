import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./RemedyModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CommonUtils } from "../../../utils";

import { toast } from "react-toastify";
import moment from "moment";
import localization from "moment/locale/vi";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgBase64: "",
    };
  }

  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  componentDidUpdate(prevProps, prevStates) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imgBase64: base64,
      });
    }
  };
  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };
  render() {
    let { isOpen, dataModal, closeModal, sendRemedy } = this.props;
    return (
      <>
        {" "}
        <Modal
          isOpen={isOpen}
          toggle={() => closeModal()}
          className={"booking-modal-container"}
          size="md"
          centered
          //   backdrop={true}
        >
          <ModalHeader toggle={() => closeModal()}>
            <FormattedMessage id="patient.booking-modal.title" />
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-6 form-group">
                <label>Email bệnh nhân</label>
                <input
                  type="email"
                  value={this.state.email}
                  className="form-control"
                  disabled
                />
              </div>
              <div className="col-6 form-group">
                <label>Chọn file hoá đơn</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => this.handleOnChangeImage(e)}
                  //   value={this.state.imgBase64}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.handleSendRemedy()}>
              <FormattedMessage id="patient.booking-modal.acept" />
            </Button>{" "}
            <Button color="secondary" onClick={() => closeModal()}>
              <FormattedMessage id="patient.booking-modal.cancel" />
            </Button>
          </ModalFooter>
        </Modal>
      </>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
