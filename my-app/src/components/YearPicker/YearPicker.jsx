import React from "react";
import "./YearPicker.less"
import moment from "moment";
// import { connect } from "react-redux";
import { Blackboard } from "components/Blackboard/Blackboard";
import PropTypes from "prop-types";

// 模仿 antd 写的年份组件
class YearPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stateOpen: false, // 是否展示弹窗
      year: "", // "2020" 返给用户的时间
      inputValue: "", // input 框显示的内容
      selectYear: moment().format("YYYY"), // 选中的时间
      yearListData: [], // 可选中的年份时间列表
      basePage: 0 // 基准页面
    }
  }

  componentDidMount() {
    const { value, open } = this.props;
    const { basePage, stateOpen } = this.state;
    const data = this.renderList(basePage)
    this.setState({
      selectYear: value ? value : moment().format("YYYY"),
      year: value ? value : "",
      yearListData: data,
      stateOpen: open === undefined ? stateOpen : open
    })
    if (open === undefined) {
      document.addEventListener("click", this.eventFn)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        year: nextProps.value
      })
    }
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.eventFn)
  }

  eventFn = (ev) => {
    const ary = [];
    ev.path.forEach(item => {
      ary.push(item.id)
    })
    if (!ary.includes("YearPicker")) {
      this.setState({ stateOpen: false })
    }
  }

  renderList = (basePage) => {
    const { selectYear } = this.state;
    const baseYear = +selectYear - (+selectYear % 12) + (12 * basePage);
    const data = [];
    for (let i = baseYear; i < +baseYear + 12; i++) {
      data.push(`${i}`)
    }
    return data
  }

  onclick = (ev) => {
    ev.stopPropagation();
    const { open } = this.props;
    this.setState({
      stateOpen: open === undefined ? true : open
    })
  }

  yearClick = (ev, item, showOk) => {
    ev.stopPropagation();
    this.setState({ selectYear: item }, () => {
      if (!showOk) {
        this.textChange()
      }
    })
  }

  iconLeftClick = () => {
    const { basePage } = this.state;
    const data = this.renderList(basePage - 1);
    this.setState({
      basePage: basePage - 1,
      yearListData: data
    })
  }

  iconRightClick = () => {
    const { basePage } = this.state;
    const data = this.renderList(basePage + 1);
    this.setState({
      basePage: basePage + 1,
      yearListData: data
    })
  }

  okBut = (ev) => {
    ev.stopPropagation();
    this.textChange()
  }

  textChange = () => {
    const { selectYear } = this.state;
    const { open } = this.props;
    this.setState({
      year: selectYear,
      stateOpen: open === undefined ? false : open,
      basePage: 0
    }, () => {
      this.props.onOk(selectYear)
    })
  }

  render() {
    const { year, stateOpen, selectYear, yearListData } = this.state;
    const { disabledStartValue, disabledEndValue, className, placeholder, disabled, showOk } = this.props;
    let oneDisplay = "block", twoDisplay = "block";
    if (disabledStartValue && yearListData.length && yearListData.includes(disabledStartValue)) {
      oneDisplay = "none";
    }
    if (disabledEndValue && yearListData.length && yearListData.includes(disabledEndValue)) {
      twoDisplay = "none";
    }
    return (
      <div className={`YearPicker ${className}`} id="YearPicker" onClick={(ev) => { disabled ? console.log() : this.onclick(ev) }}>
        <div className="begin">
          <input className={year ? "zjl-input" : "zjl-input placeholder_input"}
            value={year ? year : placeholder}
            onChange={() => { this.textChange() }}
            disabled={disabled} />
          <i className={`img day-${moment().format('DD')}`} ></i>
        </div>
        <div className="yearChild" style={{ display: stateOpen ? "block" : "none" }}>
          <div className="hearer">
            <span className="left_icon" onClick={this.iconLeftClick} style={{ display: oneDisplay }}>{"<<"}</span>
            <span className="zjl-selectText">{selectYear}</span>
            <span className="right_icon" onClick={this.iconRightClick} style={{ display: twoDisplay }}>{">>"}</span>
          </div>
          <div className="con">
            <ul className="yearBefore">
              {
                yearListData.length > 0 &&
                yearListData.map((item, index) => {
                  return <li key={index}
                    onClick={(+disabledStartValue && +disabledStartValue <= +item) && (+disabledEndValue && +item <= +disabledEndValue) ? (ev) => { this.yearClick(ev, item, showOk) } : null}>
                    <span className={(+disabledStartValue && +disabledStartValue <= +item) && (+disabledEndValue && +item <= +disabledEndValue) ? selectYear === item ? "beforeli brackgroundYear" : "beforeli" : "beforeli warnnodata"}>
                      {item}
                    </span>
                  </li>
                })
              }
            </ul>
          </div>
          {
            showOk ?
              <div className="zjl-but">
                <span onClick={ev => { this.okBut(ev) }}>确 定</span>
              </div> : null
          }
        </div>
      </div>
    )
  }
}

YearPicker.propTypes = {
  value: PropTypes.string,
  disabledStartValue: PropTypes.string,
  disabledEndValue: PropTypes.string,
  open: PropTypes.bool,
  disabled: PropTypes.bool,
  onOk: PropTypes.func,
  className: PropTypes.string,
  disabledDate: PropTypes.func
}

YearPicker.defaultProps = {
  showOk: false, // 是否使用确定按钮，默认不使用
  disabled: false, // 组件是否禁用，默认组件可以使用
  placeholder: "请选择时间", // 默认日期 or 没有日期时的提示语
  value: "", // 日期
  disabledStartValue: "1970", // 默认可选择时间范围的起始时间
  disabledEndValue: moment().format("YYYY"), // 默认可选择时间范围的结束时间
  open: undefined, // 默认弹窗展示与否不受控
  onOk: () => { console.log("click-onOk") }, // 时间切换后的回调
  className: "",
}

export default Blackboard({})(YearPicker)