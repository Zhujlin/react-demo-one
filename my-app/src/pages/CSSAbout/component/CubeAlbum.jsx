import React, { Component } from "react";
import "./CubeAlbum.less";
import img1 from "../../../assets/imgs/1.jpg";
import img2 from "../../../assets/imgs/2.jpg";
import img3 from "../../../assets/imgs/3.jpg";
import img4 from "../../../assets/imgs/4.jpg";
import img5 from "../../../assets/imgs/5.jpg";
import img6 from "../../../assets/imgs/6.jpg";
import img7 from "../../../assets/imgs/7.jpg";
import img8 from "../../../assets/imgs/8.jpg";
import img9 from "../../../assets/imgs/9.jpg";
import img10 from "../../../assets/imgs/10.jpg";
import img11 from "../../../assets/imgs/11.jpg";
import img12 from "../../../assets/imgs/12.jpg";

class CubeAlbum extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {

    return (
      <div className="CubeAlbum">
        <div id="react">
          <div className="out_frount">
            <img src={img1} alt="javaScript" className="out_pic"></img>
          </div>
          <div className="out_back">
            <img src={img2} alt="javaScript" className="out_pic"></img>
          </div>
          <div className="out_left">
            <img src={img3} alt="javaScript" className="out_pic"></img>
          </div>
          <div className="out_right">
            <img src={img4} alt="javaScript" className="out_pic"></img>
          </div>
          <div className="out_top">
            <img src={img5} alt="javaScript" className="out_pic"></img>
          </div>
          <div className="out_bottom">
            <img src={img6} alt="javaScript" className="out_pic"></img>
          </div>
          <span className="in_frount">
            <img src={img7} alt="javaScript" className="in_pic"></img>
          </span>
          <span className="in_back">
            <img src={img8} alt="javaScript" className="in_pic"></img>
          </span>
          <span className="in_left">
            <img src={img9} alt="javaScript" className="in_pic"></img>
          </span>
          <span className="in_right">
            <img src={img10} alt="javaScript" className="in_pic"></img>
          </span>
          <span className="in_top">
            <img src={img11} alt="javaScript" className="in_pic"></img>
          </span>
          <span className="in_bottom">
            <img src={img12} alt="javaScript" className="in_pic"></img>
          </span>
        </div>
      </div>
    )
  }
}

export default CubeAlbum;