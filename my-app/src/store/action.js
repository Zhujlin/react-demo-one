// 常说的，发起一个action。通过函数传入新的数据，替换之前的store

/*
没有使用 react-thunk , 只能返回一个对象
*/
// import * as Types from './action-types';
// let actions = {
//   changeFontSize(obj) {
//     return { type: Types.HTMLFONTSIZE, obj }
//   }
// };
// export default actions;


/*
引入thunk插件后，我们可以在actionCreators内部编写逻辑，处理请求结果。而不只是单纯的返回一个action对象。
*/
import * as Types from './action-types';
function changeFontSize(param) {
  return (dispatch) => {
    setTimeout(() => { // 模拟异步（这里可以是一次数据请求）
      dispatch(changeFontSizeAction(param));
    }, 3000)
  }
}

function changeFontSizeAction(obj) {
  return { type: Types.HTMLFONTSIZE, obj }
}

export {
  changeFontSize
};