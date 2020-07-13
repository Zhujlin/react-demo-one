import React, { Component } from "react";
import "./BasePopup.less";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import BaseBtn from "../BaseBtn/BaseBtn"
// 弹窗
class BasePopup extends Component {
  constructor() {
    super();
    this.state = {
      display: false
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    const { isShow } = nextProps
    if (isShow !== this.props.isShow) {
      this.closeFn(isShow);
    }
  }

  closeFn = (bool = false) => {
    this.setState({
      display: bool
    })
  }

  render() {
    const { display } = this.state;
    const { title, text, type, className, BtnListData, isShow } = this.props;
    console.log(type, isShow)
    return (
      <div className={`BasePopup prompt_location_box ${className}`} style={{ display: display ? "block" : "none" }}>
        <div className="prompt_box">
          <div className="title_box">
            <span>{title}</span>
            <i className="icon" onClick={() => { this.closeFn() }}>X</i>
          </div>
          <div className="text_father">
            <span>{text}</span>
          </div>
          <div className="btn_father">
            <div className="btn_location_father">
              {
                BtnListData.map((item, index) => {
                  return <BaseBtn
                    key={index}
                    type={item.type ? item.type : "normal"}
                    text={item.text ? item.text : ""}
                    className={item.className ? item.className : ""}
                    onClick={() => { item.onClick() }}
                    hook={() => { this.closeFn() }}
                    clickOpen={item.clickOpen}
                  />
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

BasePopup.propTypes = {
  isShow: PropTypes.bool,
  title: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  BtnListData: PropTypes.array
}

BasePopup.defaultProps = {
  isShow: true,
  title: "",
  text: "...",
  className: "",
  type: "normal",
  BtnListData: [{ text: "确定", type: "", className: "start_btn", onClick: () => { console.log("点击") }, clickOpen: false }]
}

export default connect(state => state, {})(BasePopup);