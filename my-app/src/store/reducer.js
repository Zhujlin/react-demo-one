// 相当于一个管理员，基于不同的行为标识，修改store中不同的状态
import * as Types from './action-types';

const obj = {
  htmlFontSize: 0
}

function reducer(state = obj, action) {
  switch (action.type) {
    case Types.HTMLFONTSIZE:
      return {...state, ...action.obj};
    default:
      return JSON.parse(JSON.stringify(state));
  }
}
export default reducer;