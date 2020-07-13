import React, { Component } from "react";
import "./LittleGame.less";
import connect from "react-redux/es/connect/connect";
import BasePopup from "../../components/BasePopup/BasePopup";
import BasePromptBox from "../../components/BasePromptBox/BasePromptBox";

class LittleGame extends Component {
  constructor() {
    super();
    this.state = {
      codeAry: ["a", "c", "b", "e", "f", "g", "h", "i", "j", "k"],
      brandData: [],
      operatorData: [
        { value: "+", isChoose: false, code: "add" },
        { value: "-", isChoose: false, code: "minus" },
        { value: "*", isChoose: false, code: "multiply" },
        { value: "/", isChoose: false, code: "divide" }
      ],
      SelectedData: [{}, {}, {}, {}, {}, {}, {}],
      ResultData: "?",
      startTime: 0,
      endTime: 0
    }
  }

  componentDidMount() {
    window.addEventListener("keyup", (ev) => {
      if (ev.keyCode === 13) {
        this.gameStart()
      }
    })
    this.gameStart()
  }

  numClickFn = (item, index) => { // 点击数字按钮
    const { brandData, SelectedData } = this.state;
    let newSelectedData = [{}, {}, {}, {}, {}, {}, {}];
    item.isChoose = !item.isChoose;
    brandData[index].isChoose = item.isChoose;
    if (brandData[index].isChoose) { // 加一个数据的情况
      let onOff = true
      newSelectedData = SelectedData.map((e, i) => {
        if (i % 2 === 0 && !e.value) {
          if (onOff) {
            e = item;
            onOff = false;
          }
          return e
        } else {
          return e
        }
      })
    } else { // 减一个数据
      newSelectedData = SelectedData.map((e, i) => {
        if (e.code === item.code) {
          return e = {}
        } else {
          return e
        }
      })
    }
    this.setState({
      brandData: JSON.parse(JSON.stringify(brandData)),
      SelectedData: newSelectedData
    }, () => {
      this.operation()
    })
  }

  operatorClickFn = (item, index) => { // 点击符号按钮
    const {
      // operatorData,
      SelectedData } = this.state;
    // item.isChoose = !item.isChoose;
    // operatorData[index].isChoose = item.isChoose;
    let newSelectedData = [{}, {}, {}, {}, {}, {}, {}];
    let onOff = true
    newSelectedData = SelectedData.map((e, i) => {
      if (i % 2 === 1 && !e.value) {
        if (onOff) {
          e = item;
          onOff = false;
        }
        return e
      } else {
        return e
      }
    })
    this.setState({
      // operatorData: JSON.parse(JSON.stringify(operatorData)),
      SelectedData: newSelectedData
    }, () => {
      this.operation()
    })
  }

  removeData = (item, index) => {
    const { brandData, SelectedData } = this.state;
    if (!item.code) return
    const newBrandData = brandData.map((e, i) => {
      if (e.code === item.code) {
        e.isChoose = false;
        return e
      } else {
        return e
      }
    })
    const newSelectedData = SelectedData.map((e, i) => {
      if (e.code === item.code) {
        return {}
      } else {
        return e
      }
    })

    this.setState({
      brandData: newBrandData,
      SelectedData: newSelectedData
    })
  }

  operation = () => { // 运算函数
    const { SelectedData } = this.state;
    const onOff = SelectedData.every(item => {
      return item.value
    })
    if (onOff) { // 是否需要开始运算
      // n * n * n * n
      const value4 = this.ChoiceFn(SelectedData[0].value, SelectedData[1].code, SelectedData[2].value);
      const value5 = this.ChoiceFn(value4, SelectedData[3].code, SelectedData[4].value);
      const value6 = this.ChoiceFn(value5, SelectedData[5].code, SelectedData[6].value);

      // (n * n) * (n * n)
      const value1 = this.ChoiceFn(SelectedData[0].value, SelectedData[1].code, SelectedData[2].value);
      const value2 = this.ChoiceFn(SelectedData[4].value, SelectedData[5].code, SelectedData[6].value);
      const value3 = this.ChoiceFn(value1, SelectedData[3].code, value2);

      // n * (n * n) * n
      const value7 = this.ChoiceFn(SelectedData[2].value, SelectedData[3].code, SelectedData[4].value)
      const value8 = this.ChoiceFn(SelectedData[0].value, SelectedData[1].code, value7)
      const value9 = this.ChoiceFn(value8, SelectedData[5].code, SelectedData[6].value)

      // n * (n * (n * n))
      const value10 = this.ChoiceFn(SelectedData[4].value, SelectedData[5].code, SelectedData[6].value)
      const value11 = this.ChoiceFn(SelectedData[2].value, SelectedData[3].code, value10)
      const value12 = this.ChoiceFn(SelectedData[0].value, SelectedData[1].code, value11)

      // n * (n * (n * n)
      // const value13 = this.ChoiceFn()
      // const value14 = this.ChoiceFn()
      // const value15 = this.ChoiceFn()

      const onOff = [value3, value6, value9, value12].some(item => {
        return (item === 24 || item === -24)
      })
      if (onOff) {
        this.setState({
          endTime: new Date().getTime(),
          ResultData: 24
        })
      }
    }
  }

  ChoiceFn = (a, code, b) => { // 选择运算函数
    let value = 0;
    const that = this;
    switch (code) {
      case "add":
        value = that.additionFn(a, b)
        break;
      case "minus":
        value = that.subtractionFn(a, b)
        break;
      case "multiply":
        value = that.multiplicationFn(a, b)
        break;
      case "divide":
        value = that.divisionFn(a, b)
        break;
      default:
        break;
    }
    return value
  }

  additionFn = (a, b) => {
    return (a + b)
  }

  subtractionFn = (a, b) => {
    return (a - b)
  }

  multiplicationFn = (a, b) => {
    return (a * b)
  }

  divisionFn = (a, b) => {
    return (a / b)
  }

  gameStart = () => {
    const { codeAry } = this.state;
    const data = [];
    for (let i = 0; i < 4; i++) {
      const num = parseInt(`${Math.random() * 10 + 1}`)
      const obj = {
        value: num,
        isChoose: false,
        code: codeAry[i]
      }
      data.push(obj)
    }
    this.setState({
      brandData: data,
      startTime: new Date().getTime(),
      // operatorData: [
      //   { value: "+", isChoose: false, code: "add" },
      //   { value: "-", isChoose: false, code: "minus" },
      //   { value: "*", isChoose: false, code: "multiply" },
      //   { value: "/", isChoose: false, code: "divide" }
      // ],
      SelectedData: [{}, {}, {}, {}, {}, {}, {}],
      ResultData: "?"
    })
  }

  render() {
    const { brandData, SelectedData, operatorData, ResultData, startTime, endTime } = this.state;
    const t = Math.floor((endTime - startTime)/1000);
    console.log(operatorData)
    return (
      <div className="LittleGame">
        <div className="box">
          <ul className="child_box">
            {
              brandData.length && brandData.map((item, index) => {
                return <li
                  className={item.isChoose ? "isChoose" : ""}
                  key={index}
                  onClick={() => { this.numClickFn(item, index) }}
                ><span>{item.value}</span></li>
              })
            }
          </ul>
        </div>
        <div className="operator box">
          <ul className="child_box">
            {
              operatorData.map((item, index) => {
                return <li
                  className={item.isChoose ? "isChoose" : ""}
                  key={index}
                  onClick={() => { this.operatorClickFn(item, index) }}
                ><span>{item.value}</span></li>
              })
            }
          </ul>
        </div>
        <div className="compute box">
          <div className="location_box">
            {
              SelectedData.map((item, index) => {
                return <span
                  className="span"
                  key={index}
                  onClick={() => { this.removeData(item, index) }}
                >{item.value ? item.value : ""}</span>
              })
            }
            <span className="span">=</span>
            <span className="span">{ResultData}</span>
          </div>
        </div>
        <BasePopup
          title="恭喜你"
          text={`用时${t}秒。是否开启下一关？`}
          isShow={ResultData === 24 ? true : false}
          BtnListData={[
            { text: "确定", type: "", className: "start_btn", onClick: () => { this.gameStart() }, clickOpen: true }
          ]}
        ></BasePopup>
        <div className="memo_box">
          <BasePromptBox
            text="游戏提供的计算模型:<br />n * n * n * n<br />(n * n) * (n * n)<br />n * (n * n) * n<br />n * (n * (n * n))<br/>可以按回车键进行下一关"
          />
        </div>
        <div className="useTime">
          <span></span>
        </div>
      </div>
    )
  }
}

export default connect(state => state, {})(LittleGame);