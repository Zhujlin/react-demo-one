//Store相当于一个仓库，存储各种数据。 这个文件的作用是，整合文件。

/*
  import { createStore } from 'redux';
  import reducer from './reducer';
  const store = createStore(reducer);
  window._store = store; //在window上挂一个叫_store的属性，可以看到store里面的内容
  export default store;
*/

// 使用 thunk
import { createStore, applyMiddleware } from "redux";
import reducer from './reducer';
import thunk from "redux-thunk";
const store = createStore(
  reducer,
  applyMiddleware(thunk)
)
export default store;

/*
使用 thunk 中间件。以及：combineReducers、applyMiddleWare、compose

applyMiddleware() 使用包含自定义功能的 middleware 来扩展 Redux 是一种推荐的方式。
  例如，redux-thunk 支持 dispatch function，以此让 action creator 控制反转。
  被 dispatch 的 function 会接收 dispatch 作为参数，并且可以异步调用它。
  这类的 function 就称为 thunk。另一个 middleware 的示例是 redux-promise。
  它支持 dispatch 一个异步的 Promise action，并且在 Promise resolve 后可以 dispatch 一个普通的 action。

compose 可以将中间件组合拼装，使组件更加强大。


-------------------------使用中间件的 store ------------------------
// import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
// const store = createStore(
//   combineReducers(reducer, reducer1, reducer2), //如果有多个 reducer ，将多个 reducer 整合在一起(项目只有一个reducer时，不建议使用并且会出现错误提示)
//   applyMiddleware(thunk) //可以在 action 中做异步处理 dispatch
//   //如果有多个中间件就可以这样写：compose(applyMiddleware(thunk), xxxx, xxxxx)
// )



--------------使用 applyMiddleware(thunk) 之后，action 中可以这样写：--------------
import * as Types from './action-types';
  function getList(param) {
    return (dispatch) => {
      setTimeout(() => {     // 模拟异步（这里可以是一次数据请求）
        dispatch listData(param)
      }, 5000)
    }
  }

  function listData(obj) {
    return { type: Types.LISTDATA, obj }
  }

export {
  getList
};



---------------项目组件中使用的例子：--------------
import { getList } from "../../store/store";
import React, { Component } from "react";
import "./BaseEchart.less";
import connect from "react-redux/es/connect/connect";

class BaseEchart extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    const param = {
      startTime: "2019-10-20 12:00:00",
      endTime: "2019-10-21 12:00:00"
    }
    this.props.getList(param)
  }

  // UNSAFE_componentWillMount,
  componentWillReceiveProps(nextProps) {
    if (nextProps.listData !== this.props.listData) {
      console.log(nextProps.actions.listData)
    }
  }

  //componentWillUnmount() {}

  render() {
    return (
      <div className="BaseEchart">

      </div>
    )
  }
}

export default connect(state => state, {getList})(BaseEchart);


*/