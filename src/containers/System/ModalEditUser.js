/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "./../../utils/emitter";
import _ from "lodash";
class ModalEditUser extends Component {
  constructor(props) {
    super(props); //Tất cả props được truyền đều nhận hết ở đây (kể cả state)
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      //_.isEmpty(user kiem tra object rong va tra ve false)
      this.setState({
        id: user.id,
        email: user.email,
        password: "hashcode",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
  }
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
  handleSaveUser = () => {
    let isValid = this.checkValidInput();
    if (isValid) {
      this.props.editUser(this.state);
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
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader toggle={() => this.toggle()}>Edit the user</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row mt-3">
              <div className="col-6 form-group">
                <label>Email</label>
                <input
                  disabled
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
                  disabled
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
            onClick={() => this.handleSaveUser()}
          >
            Save changes
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
