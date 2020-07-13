import React, { Component } from "react";
import "./Iframe.less";

class Iframe extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {

    return (
      <div className="Iframe">
        <iframe className="nested_pages" src="https://fanyi.baidu.com/translate" title="baidu"></iframe>
      </div>
    )
  }
}

export default Iframe;