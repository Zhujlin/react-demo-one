import React from "react";
import "./QuarterlyPicker.less"
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// 模仿 antd 写的季度组件
class QuarterlyPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stateOpen: false, // 是否展示弹窗
      year: "", // "2020"
      selectTime: `${moment().format("YYYY")}-${moment().quarter()}`, // 选中的时间， "2020-1"， "-1" 代表第一季度
      selectionTime: "", // 点确定后需要返回的时间
      oneDisplay: "block",
      twoDisplay: "block"
    }
  }

  componentDidMount() {
    const { value, open } = this.props;
    let { year, selectTime } = this.state;
    year = value ? value.split("-")[0] : selectTime.split("-")[0]
    this.setState({
      selectTime: value ? value : selectTime,
      selectionTime: value ? value : "",
      year
    })
    this.idBlock(year)
    if (open === undefined) {
      document.addEventListener("click", this.eventFn)
    }
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.eventFn)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps, 1111)
    if (nextProps.value !== this.props.value) {
      const { value } = nextProps;
      let { year, selectTime } = this.state;
      year = value ? value.split("-")[0] : selectTime.split("-")[0]
      this.setState({
        selectTime: value ? value : selectTime,
        selectionTime: value ? value : "",
        year
      })
      this.idBlock(year)
    }
  }

  eventFn = (ev) => {
    const ary = [];
    ev.path.forEach(item => {
      ary.push(item.id)
    })
    if (!ary.includes("QuarterlyPicker")) {
      this.setState({ stateOpen: false })
    }
  }

  onclick = (ev) => {
    ev.stopPropagation();
    this.setState({ stateOpen: true })
  }

  ulliclick = (index) => {
    const { showOk } = this.props;
    const { year } = this.state;
    this.setState({
      selectTime: `${year}-${index}`
    }, () => {
      if (!showOk) {
        this.textChange()
      }
    })
  }

  iconLeftClick = () => {
    let { year } = this.state;
    const { disabledStartValue } = this.props;
    if (disabledStartValue) {
      if (year > disabledStartValue.split("-")[0]) {
        year--;
        this.setState({
          year: `${year}`
        })
      }
    } else {
      year--;
      this.setState({
        year: `${year}`
      })
    }
    this.idBlock(year)
  }

  iconRightClick = () => {
    let { year } = this.state;
    const { disabledEndValue } = this.props;
    if (disabledEndValue) {
      if (year < disabledEndValue.split("-")[0]) {
        year++;
        this.setState({
          year: `${year}`
        })
      }
    } else {
      year++;
      this.setState({
        year: `${year}`
      })
    }
    this.idBlock(year)
  }

  idBlock = (year) => {
    const { disabledStartValue, disabledEndValue } = this.props;
    if (disabledStartValue) {
      const startYear = disabledStartValue.split("-")[0];
      if (+year > +startYear) {
        this.setState({
          oneDisplay: "block"
        })
      } else {
        this.setState({
          oneDisplay: "none"
        })
      }
    } else {
      this.setState({
        oneDisplay: "block"
      })
    }

    if (disabledEndValue) {
      const endYear = disabledEndValue.split("-")[0];
      if (+year < +endYear) {
        this.setState({
          twoDisplay: "block"
        })
      } else {
        this.setState({
          twoDisplay: "none"
        })
      }
    } else {
      this.setState({
        twoDisplay: "block"
      })
    }
  }

  okBut = (ev) => {
    ev.stopPropagation();
    this.textChange()
  }

  textChange = () => {
    const { selectTime } = this.state;
    this.setState({
      selectionTime: selectTime,
      stateOpen: false
    }, () => {
      this.props.onOk(selectTime)
    })
  }

  quarterDataBefore = () => {
    const { selectTime, year } = this.state;
    const { disabledStartValue, disabledEndValue } = this.props;
    const selectYear = selectTime.split("-")[0];
    const selctQuarter = selectTime.split("-")[1];
    let oneOnOff = false;
    let twoOnOff = false;
    const startYear = disabledStartValue.split("-")[0];
    const startQuarter = disabledStartValue.split("-")[1];
    if (disabledStartValue) {
      if (startYear === year) {
        oneOnOff = true
      } else {
        oneOnOff = false
      }
    }
    const endYear = disabledEndValue.split("-")[0];
    const endQuarter = disabledEndValue.split("-")[1];
    if (disabledEndValue) {
      if (endYear === year) {
        twoOnOff = true
      } else {
        twoOnOff = false
      }
    }
    const dom = this.props.quarterData.map((item, index) => {
      return <li key={index} className="quaterleftli"
        onClick={(oneOnOff && index + 1 < +startQuarter) || (twoOnOff && index + 1 > +endQuarter) ? null : this.ulliclick.bind(this, index + 1)}>
        <span className={(oneOnOff && index + 1 < +startQuarter) || (twoOnOff && index + 1 > +endQuarter) ? "normalcolor warnnodata" :
          +selctQuarter === index + 1 && +year === +selectYear ? "normalcolor nonormaocolor" : "normalcolor"}>{item}</span>
      </li>
    })
    return dom
  }

  toChinese = (value) => {
    let newVlaue = value;
    const yearValue = value.slice(0, 4);
    const index = value.slice(value.length - 1);
    newVlaue = `${yearValue} ${this.props.quarterData[index - 1] ? this.props.quarterData[index - 1] : ""}`;
    return newVlaue
  }

  render() {

    const { oneDisplay, twoDisplay, selectTime, year, selectionTime, stateOpen } = this.state;
    const { className, placeholder, disabled, showOk, open } = this.props;
    let openOnOff = false;
    if (typeof (this.props.open) === "boolean") {
      openOnOff = open;
    } else {
      openOnOff = stateOpen;
    }
    return (
      <div className={`QuarterlyPicker ${className}`} id="QuarterlyPicker" onClick={disabled ? console.log() : ev => { this.onclick(ev) }}>
        <div className="begin">
          <input className={selectionTime ? "zjl-input" : "zjl-input placeholder_input"}
            value={this.toChinese(selectionTime ? selectionTime : placeholder)}
            disabled={disabled}
            onChange={() => { this.textChange() }}
          />
          <i className={`img day-${moment().format('DD')}`}></i>
        </div>
        <div className="child" style={{ display: openOnOff ? "block" : "none" }}>
          <header className="zjl-timehear">
            <span>{this.toChinese(selectTime)}</span>
          </header>
          <div className="con">
            <ul className="content-one">
              <li className="lefticon" onClick={this.iconLeftClick} style={{ display: oneDisplay }}>{"<<"}</li>
              <li className="righticon" onClick={this.iconRightClick} style={{ display: twoDisplay }}>{">>"}</li>
              <li>{year}</li>
            </ul>
          </div>
          <div className="TimerXhlleft">
            <ul className="quaterleft">
              {this.quarterDataBefore()}
            </ul>
          </div>
          {
            showOk ?
              <div className="zjl-but">
                <span onClick={this.okBut}>确 定</span>
              </div> : null
          }
        </div>
      </div>
    )
  }
}

QuarterlyPicker.propTypes = {
  quarterData: PropTypes.array,
  value: PropTypes.string,
  disabledStartValue: PropTypes.string,
  disabledEndValue: PropTypes.string,
  open: PropTypes.bool,
  onOk: PropTypes.func,
  disabled: PropTypes.bool
}

QuarterlyPicker.defaultProps = {
  quarterData: ["第一季度", "第二季度", "第三季度", "第四季度"],
  showOk: false, // 是否使用确定按钮，默认不使用
  disabled: false, // 组件是否禁用，默认组件可以使用
  placeholder: "请选择时间", // 默认日期 or 没有日期时的提示语
  value: "",
  disabledStartValue: "1970-1",
  disabledEndValue: `${moment().format("YYYY")}-${moment().quarter()}`,
  open: undefined,
  onOk: () => { console.log("click-onOk") },
  className: ""
}

// export default QuarterlyPicker;
export default connect(state => state, {})(QuarterlyPicker);