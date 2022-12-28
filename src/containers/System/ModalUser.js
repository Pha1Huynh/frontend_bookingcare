/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "./../../utils/emitter";

class ModalUser extends Component {
  constructor(props) {
    super(props); //Tất cả props được truyền đều nhận hết ở đây (kể cả state)
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };

    this.listenToEmmitter();
  }
  listenToEmmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      //reset state
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      });
    });
  }
  componentDidMount() {}
  toggle = () => {
    this.props.toggleFromParent();
  };
  checkValidInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert(`MMMissing parammeter at ${[arrInput[i]]}`);
        break;
      }
    }
    return isValid;
  };
  handleAddNewUser = () => {
    let isValid = this.checkValidInput();
    if (isValid) {
      this.props.createNewUser(this.state);
    }
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  render() {
    // console.log("Check child props", this.props);
    // console.log("Check child open modal", this.props.isOpen);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader toggle={() => this.toggle()}>
          Create a new user
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row mt-3">
              <div className="col-6 form-group">
                <label>Email</label>
                <input
                  className="form-control"
                  value={this.state.email}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "email");
                  }}
                />
              </div>
              <div className="col-6 form-group">
                <label>Password</label>
                <input
                  className="form-control"
                  value={this.state.password}
                  type="password"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "password");
                  }}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6 form-group">
                <label>Firsrname</label>
                <input
                  className="form-control"
                  value={this.state.firstName}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "firstName");
                  }}
                />
              </div>
              <div className="col-6 form-group">
                <label>Lastname</label>
                <input
                  className="form-control"
                  value={this.state.lastName}
                  type="password"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "lastName");
                  }}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 form-group">
                <label>Address</label>
                <input
                  className="form-control"
                  value={this.state.address}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "address");
                  }}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleAddNewUser()}
          >
            Add new
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => this.toggle()}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
