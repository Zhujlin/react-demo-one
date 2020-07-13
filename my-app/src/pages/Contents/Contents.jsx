import React, { Component } from "react";
import "./Contents.less";
// import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Tree } from 'antd';
const { TreeNode } = Tree;

// {title: "0-0", key: "0-0", children: Array(3)},
// {title: "0-1", key: "0-1", children: Array(3)}
// {title: "0-2", key: "0-2"}

const gData = [
  {
    title: "CSS", key: "/CSS", path: "/CSS/CssIndex",
    children: [
      { title: "3D旋转立方相册", key: "/CSS/CssIndex", path: "/CSS/CssIndex" }
    ]
  },
  {
    title: "Demo", key: "/Demo", path: "/Demo/MyAntd",
    children: [
      { title: "MyAntd", key: "/Demo/MyAntd", path: "/Demo/MyAntd" },
      { title: "雷达图", key: "/Demo/radar", path: "/Demo/radar" },
      { title: "旭日图", key: "/Demo/sunburst", path: "/Demo/sunburst" },
      { title: "饼图", key: "/Demo/Pie", path: "/Demo/Pie" },
      { title: "关系图", key: "/Demo/graph", path: "/Demo/graph" }
    ]
  },
  {
    title: "小游戏", key: "/LittleGame", path: "/LittleGame/compute24",
    children: [
      { title: "24点", key: "/LittleGame/compute24", path: "/LittleGame/compute24" }
    ]
  },
  {
    title: "<iframe/>使用", key: "/iframe", path: "/iframe"
  }
];

class Contents extends Component {
  constructor() {
    super();
    this.state = {
      gData,
      expandedKeys: ["Demo"],
      // defaultSelectedKeys: ["/MyAntd"],
      selectedKeys: ["/MyAntd"]
    }
  }

  componentDidMount() {
    // console.log(this.props.routerData)
    // console.log(this.props.location.pathname)
    const pathname = this.props.location.pathname
    const expandedKeys = pathname.split("/")[1]
    if (pathname) {
      this.setState({
        selectedKeys: [`${pathname}`],
        expandedKeys: [`/${expandedKeys}`]
      })
    }
  }

  onExpand = info => {
    // console.log(info);
    // expandedKeys 需要受控时设置
    this.setState({
      expandedKeys: info,
    });
  };

  onDrop = info => {
    // console.log(info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };
    const data = [...this.state.gData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.setState({
      gData: data,
    });
  };

  onSelect = (selectedKeys, ev) => {
    // console.log(selectedKeys, ev)
    const path = ev.node.props.path;
    this.props.history.push(path)
    this.setState({
      selectedKeys
    })
    // 用 withRouter 之后，就可以使用 this.props.history.push(url) 进行浏览器路由的跳转。
    // 除此之外，还可以用 <Link to="" ... 进行路由跳转。
  }

  render() {
    // console.log(this.state.expandedKeys)
    const loop = data =>
      data.map(item => {
        if (item.children && item.children.length) {
          return (
            <TreeNode key={item.key} title={item.title} path={item.path}>
              {loop(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode key={item.key} title={item.title} path={item.path} />;
      });
    return (
      <div className="Contents">
        <Tree
          className="draggable-tree"
          // defaultExpandedKeys={this.state.expandedKeys}
          expandedKeys={this.state.expandedKeys}
          selectedKeys={this.state.selectedKeys}
          // defaultSelectedKeys={this.state.defaultSelectedKeys}
          autoExpandParent={true}
          checkStrictly={true}
          draggable
          blockNode
          // onDragEnter={this.onDragEnter}
          onExpand={this.onExpand}
          onDrop={this.onDrop}
          onSelect={this.onSelect}
        >
          {loop(this.state.gData)}
        </Tree>
      </div>
    )
  }
}

export default withRouter(Contents);