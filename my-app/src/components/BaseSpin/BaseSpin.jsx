import React, { Component } from "react";
import ProTypes from "prop-types";
import "./BaseSpin.less";
// loading 正在加载中
class BaseSpin extends Component {

  render() {
    const { userClass } = this.props;
    return (
      <div className={`spin-contain ${userClass}`}>
        <div className="spin-pic">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
      </div>
    )
  }
}

BaseSpin.propTypes = {
  userClass: ProTypes.string
}

BaseSpin.defaultProps = {
  userClass: ""
}

export default BaseSpin;