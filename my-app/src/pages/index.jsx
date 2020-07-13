import React, { Component } from "react";
import "./index.less";
import { connect } from 'react-redux';
import { changeFontSize } from '../store/action';
import { SubRoute, routerData } from "../router/router";
import "../assets/css/BasicLess.less";
import Contents from "./Contents/Contents.jsx";
require("antd/dist/antd.css");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isIndex: 0
    }
  }

  componentDidMount() {
    routerData.forEach((item, index) => {
      if (item.path === window.location.pathname) {
        this.setState({
          isIndex: index
        })
      }
    })
    this.rem()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.eventFn, false)
  }

  rem = () => {  //改变根节点的
    (() => {
      this.computed();
      window.addEventListener('resize', this.computed, false);
    })();
  }

  computed = () => {
    let HTML = document.documentElement;
    let winW = HTML.clientWidth;
    HTML.style.fontSize = (winW / 1366) * 16 + 'px';
    // console.log(changeFontSize, this.props)
    this.props.changeFontSize({
      htmlFontSize: HTML.style.fontSize
    }) //把改变后的根节点大小传出去，也可以存在 redux 中，比如Echarts就需要判断使用
  }

  changeIndex = (index) => {
    this.setState({
      isIndex: index
    })
  }

  render() {
    // const { isIndex } = this.state;
    // console.log(isIndex)
    // const list = routerData.map((item, i) => {
    //   return <li key={i} className={isIndex === i ? "checked" : ""}>
    //     <Link to={item.path} onClick={() => this.changeIndex(i)}>{item.name}</Link>
    //   </li>
    // })

    return (
      <div className="page_index">
        <div className="page_index_container">
          <div className="page_index_header page_index_item">
            <h1 className="page_index_title">HEADER</h1>
          </div>
          <div className="page_index_menu page_index_item">
            <div className="page_index_menu_highAndLow">
              <div className="page_index_menu_leftAndRight">
                <Contents routerData={routerData} />
              </div>
            </div>
          </div>
          <div className="page_index_content page_index_item">
            <div className="page_index_content_paddingBox">
              <SubRoute />
            </div>
          </div>
          {/* <div className="footer item">FOOTER</div> */}
        </div>
      </div>
    )
  }
}

export default connect(state => state, {changeFontSize})(Home);