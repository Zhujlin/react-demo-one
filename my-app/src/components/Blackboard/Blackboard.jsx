/*
高级组件 higherOrderComponent （HOC）
是个纯函数，接收一个组件，返回一个组件

*/
import React, { Component } from "react";
import "./Blackboard.less";

const defaultParams = {

}

export const Blackboard = (params = defaultParams) => (WrappedComponent) => {
  return class HOC extends Component {
    render() {
      return (
        <div className="Blackboard">
          <section className="code-box-demo">
            <WrappedComponent {...this.props} {...params}/>
          </section>
          <section className="code-box-meta markdown">
            <div className="code-box-title">
              <span>高阶组件用法举例</span>
            </div>
          </section>


        </div>
      )
    }
  }
}