import React, { Component } from "react";

import { connect } from 'react-redux';

import "./Demo.less";
import QuarterlyPicker from "components/QuarterlyPicker/QuarterlyPicker";
import YearPicker from "components/YearPicker/YearPicker";
import RotationChart from "./compontent/RotationChart";
import Select from "components/Select/Select";

const listData = [
  1, 2, 3, 4, 5
]
const Option = Select.Option;

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "2019-1"
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        value: "2020-2"
      })
    }, 3000)
  }

  YearPickerFn = (value) => {
    console.log(value)
  }

  QuarterlyPickerFn = (value) => {
    console.log(value)
    this.setState({
      value
    })
  }

  handleChange = (value, item) => {
    console.log(value, item);
  }

  firstAjax = () => {
    console.log("发送请求")
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          // info.innerHTML = xhr.responseText;
          console.log(xhr.responseText);
        } else if (xhr.status === 304) {
          console.log(xhr.responseText);
        }
      }
    };

    // 每次需要发请求需要做两步：
    xhr.open("get", 'http://localhost:8080/api', true);
    xhr.send(null);
  }

  render() {
    const { value } = this.state;

    return (
      <div className="Demo">
        <div className="picker_father">
          <QuarterlyPicker
            disabled={true}
          // htmlFontSize={this.props.htmlFontSize}
          />
        </div>
        <div className="picker_father">
          <YearPicker
            onOk={this.YearPickerFn}
          />
        </div>
        <div className="picker_father">
          <QuarterlyPicker
            showOk={true}
            onOk={this.QuarterlyPickerFn}
            value={value}
          />
        </div>
        <div className="icon_father">
          <span className="arrow"></span>
          <span className="triangle"></span>
          <span className="Yes"></span>
        </div>
        <div id="info">
          <button onClick={this.firstAjax}></button>
        </div>
        <div className="select_father">
          <Select onChange={this.handleChange}>
            <Option value="北京">北京</Option>
            <Option value="上海" disabled="true">上海</Option>
            <Option value="广东">广东</Option>
          </Select>
        </div>
        <div className="img_father">
          <RotationChart />
        </div>
        <div className="img_father">
          {
            listData.map((item, index) => {
              return <span id="xxxx" key={index}>{item}</span>
            })
          }
        </div>
      </div>
    )
  }
}

// export default Demo
export default connect(state => state, {})(Demo);