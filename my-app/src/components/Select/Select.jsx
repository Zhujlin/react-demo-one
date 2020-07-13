import React, { Component } from "react";
import "./Select.less";
import Option from "./Option";
import PropTypes from "prop-types";
// 下拉选择框，为完成
class Select extends Component {
  constructor() {
    super();
    this.state = {
      isSelected: false,
      allOption: [],
      selectedItem: "北京"
    }
  }

  componentDidMount() {
    this.setCallBackData(this.props.children);
    // const selectDropdown = document.
    window.addEventListener("click", this.selectBlur)
  }

  componentWillReceiveProps(nextProps) {
    const { children } = nextProps;
    if (children !== this.props.children) {
      this.setCallBackData(children)
    }
  }

  // componentDidUpdate()

  componentWillUnmount() {
    window.removeEventListener("click", this.eventFn)
  }

  setCallBackData = (param = []) => {
    const allOption = [];
    if (param.length) {
      param.forEach((item) => {
        const obj = {};
        Object.entries(item.props).forEach((item) => {
          obj[item[0]] = item[1]
        })
        allOption.push(obj)
      })
    }
    this.setState({
      allOption
    })
  }

  selectClick = () => {
    const { isSelected } = this.state;
    this.setState({
      isSelected: !isSelected
    })
  }

  selectBlur = (ev) => {
    const classNameAry = [];
    if (ev && ev.path && ev.path.length) {
      ev.path.forEach(item => {
        classNameAry.push(item.className)
      })
      if (!classNameAry.includes("zjl-Select")) {
        this.setState({
          isSelected: false
        })
      }
    }
  }

  dropdownMenuItemClick = (value, item) => {
    // console.log(value, item)
    this.setState({
      selectedItem: value
    })
    this.props.onChange(value, item)
  }

  render() {
    const { isSelected, selectedItem, allOption } = this.state;
    const { disabled } = this.props;
    // console.log(allOption)
    return (
      <div className="zjl-Select">
        <div className={!disabled ? isSelected ? "select-open" : "" : "select-disabled"} tabIndex="-1" onClick={this.selectClick} onBlur={this.selectBlur}>
          <div className="select-selection select-selection--single">
            <div className="select-selection-selected-value">{selectedItem}</div>
            <span className="select-arrow"></span>
          </div>
        </div>
        {
          !disabled ?
            <div className={isSelected ? "select-dropdown" : "select-dropdown-hidden select-dropdown"}>
              <ul className="ant-select-dropdown-menu">
                {
                  allOption.map((item, index) => {
                    return <li key={index}
                      onClick={!item.disabled ? () => { this.dropdownMenuItemClick(item.children, item) } : () => { console.log() }}
                      className={!item.disabled ?
                        selectedItem === item.children ? "select-dropdown-menu-item select-dropdown-menu-item-selected" : "select-dropdown-menu-item"
                        : "select-dropdown-menu-item select-dropdown-menu-item-disabled"}
                    >{item.children}</li>
                  })
                }
              </ul>
            </div> : null
        }
      </div>
    )
  }
}

Select.propTypes = {
  handleChange: PropTypes.func,
  disabled: PropTypes.bool
}

Select.defaultProps = {
  disabled: false, // 组件是否禁用，默认组件可以使用
  handleChange: () => { console.log() },
  className: ""
}

Select.Option = Option;

export default Select;