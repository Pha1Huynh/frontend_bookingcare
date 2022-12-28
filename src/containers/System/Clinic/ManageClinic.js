import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import ManageDoctor from "../Admin/ManageDoctor";
import Specialty from "../../HomePage/Section/Specialty";
import "./ManageClinic.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { Button } from "reactstrap";
import CommonUtils from "../../../utils/CommonUtils";
import { createNewClinic } from "../../../services/userService";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevStates) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleOnchangeInput = (e, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = e.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };
  handleSaveNewClinic = async () => {
    let res = await createNewClinic(this.state);
    if (res && res.errCode === 0) {
      toast.success("Create a clinic success");
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
        address: "",
      });
    } else {
      toast.error("Create a clinic failed");
    }
  };
  render() {
    return (
      <div className="manage-specialty-container">
        <div className="">
          <div className="ms-title">Quản lý phòng khám</div>
        </div>
        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>Tên phòng khám</label>
            <input
              className="form-control"
              value={this.state.name}
              onChange={(e) => {
                this.handleOnchangeInput(e, "name");
              }}
            />
          </div>
          <div className="col-6 form-group">
            <label htmlFor="">Ảnh phòng khám</label>
            <input
              className="form-control-file"
              type="file"
              onChange={(e) => this.handleOnChangeImage(e)}
            />
          </div>
          <div className="col-6 form-group">
            <label>Địa chỉ phòng khám</label>
            <input
              className="form-control"
              value={this.state.address}
              onChange={(e) => {
                this.handleOnchangeInput(e, "address");
              }}
            />
          </div>
          <div className="col-12">
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div className="col-12">
            {" "}
            <button
              className="btn btn-primary"
              onClick={() => this.handleSaveNewClinic()}
            >
              Save
            </button>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
