import React, { Component } from "react";
import "./CssIndex.less";
import CubeAlbum from "./component/CubeAlbum";

class CssIndex extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {

    return (
      <div className="CssIndex">
        <CubeAlbum></CubeAlbum>
      </div>
    )
  }
}

export default CssIndex;