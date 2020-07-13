import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";

//还没有用到 redux 的时候，引用 Provider 等，会报错。
import {Provider} from 'react-redux';
import store from "./store/store";
if (module.hot) {
    module.hot.accept();
}
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);