import React, { Component } from "react";
import "./BaseBtn.less";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// 按钮
class BaseBtn extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  componentDidMount() {

  }

  btnClick = () => {
    const { onClick, hook, clickOpen } = this.props;
    onClick()
    if (clickOpen) {
      hook()
    }
  }

  render() {
    const { text, type, className } = this.props;
    return (
      <div className={`BaseBtn ${className}`}>
        {
          type === "disabled" ? null : null
        }
        {
          type === "normal" ?
            <div className="normalBtn" onClick={() => { this.btnClick() }}>{text}</div> : null
        }
      </div>
    )
  }
}

BaseBtn.propTypes = {
  clickOpen: PropTypes.bool,
  onClick: PropTypes.func,
  hook: PropTypes.func,
  text: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.string
}

BaseBtn.defaultProps = {
  clickOpen: false,
  hook: () => { console.log("副作用") },
  onClick: () => { console.log("点击") },
  text: "确定",
  className: "",
  type: "normal", // "normal" | "disabled"
  disabled: ""
}

export default connect(state => state, {})(BaseBtn);