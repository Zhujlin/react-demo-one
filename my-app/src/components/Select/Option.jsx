import React from "react";
import "./Option.less";

const Option = (props) => {
  return (
    <React.Fragment>{props.children}</React.Fragment>
  )
}

export default Option;

//  props 和 props.children 不写，在 Select 中还是有数据，不知道为何要写？