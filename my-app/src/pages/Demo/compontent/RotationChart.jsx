import React, { Component } from "react";
import "./RotationChart.less";
import imgOne from "../../../assets/imgs/2.jpg"
import imgTwo from "../../../assets/imgs/3.jpg"
import imgThree from "../../../assets/imgs/4.jpg"
import imgFour from "../../../assets/imgs/5.jpg"
import imgxx from "../../../assets/imgs/6.jpg"
import imgxxx from "../../../assets/imgs/11.jpg"

const imgList = [
  { picUrl: imgOne },
  { picUrl: imgTwo },
  { picUrl: imgThree },
  { picUrl: imgFour },
  { picUrl: imgxx },
  { picUrl: imgxxx }
]

// 轮播图
class RotationChart extends Component {
  constructor() {
    super();
    this.state = {
      imgIndex: 0,
      imgsLeft: 0,
    }
  }

  componentDidMount() {

  }

  scrollLeft = () => {
    const { imgsLeft } = this.state;
    let { imgIndex } = this.state;
    const oneIMgWidth = getComputedStyle(this.mayimgs.childNodes[0]).width.split("p")[0];
    const newLeft = imgsLeft - Number(oneIMgWidth) - 13;
    this.setState({
      imgsLeft: newLeft,
      imgIndex: ++imgIndex
    })
  }

  scrollRight = () => {
    const { imgsLeft } = this.state;
    let { imgIndex } = this.state;
    const oneIMgWidth = getComputedStyle(this.mayimgs.childNodes[0]).width.split("p")[0];
    const newLeft = imgsLeft + Number(oneIMgWidth) + 13;
    this.setState({
      imgsLeft: newLeft,
      imgIndex: --imgIndex
    })
  }


  render() {
    const { imgsLeft, imgIndex } = this.state;
    // console.log(imgIndex)
    return (
      <div className="RotationChart">
        <div className="img_scroll_box">
          <div className="position_box">
            <div className="scroll_left" style={{ display: imgIndex < (imgList.length - 3) ? "block" : "none" }}>
              <div className="icon" onClick={() => this.scrollLeft()}></div>
            </div>
            <div className="scroll_right" style={{ display: imgIndex ? "block" : "none" }}>
              <div className="icon" onClick={() => this.scrollRight()}></div>
            </div>
            <div className="imgs_father">
              <ul ref={(ref) => { this.mayimgs = ref }} style={{ left: `${imgsLeft}Px` }}>
                {
                  imgList.map((item, index) => {
                    return <li key={index}>
                      <img src={item.picUrl || "#"} alt=""></img>
                    </li>
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RotationChart;