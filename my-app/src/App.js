import React, {
  Component
} from 'react';
import './App.css';
import Home from "./pages/index";
class App extends Component {

  /*
    大多数浏览器，默认根节点字号为 16px，因此 1rem = 16px。
    为了让 1rem === 100px，可以直接修改根节点 html.style.fontSize = "100px"，
    方便之后使用 rem
    const html = document.querySelector("html");
    html.style.fontSize = "100px"
  */

  render() {
    return (
      <div className = "App">
        <Home></Home>
      </div>
    );
  }
}

export default App;