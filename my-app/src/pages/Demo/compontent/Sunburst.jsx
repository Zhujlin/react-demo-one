import React, { Component } from "react";
import "./Sunburst.less";
import echarts from "echarts";

// 旭日图 没有 tooltip （提示框）， 也不能像饼图一样有 labelline （指示线）。

const color = ["#e82821", "#fa7e03", "#ecb420", "#c2cc18", "#5dcc12", "#1c9754", "#32d392", "#2cc0e0", "#427aff", "#6f25dc", "#d93beb"]
class Sunburst extends Component {
  constructor() {
    super();
    this.state = {
      option: {
        // color: color,
        // silent: true, // silent 沉默的， 是否静态无交互
        series: {
          radius: ['15%', '80%'],
          type: 'sunburst',
          sort: null, // 默认值 'desc' 表示降序排序；还可以设置为 'asc' 表示升序排序；null 表示不排序，使用原始数据的顺序；或者用回调函数进行排列
          highlightPolicy: 'descendant',// 当鼠标移动到一个扇形块时，可以高亮相关的扇形块。如果其值为 'descendant'，则会高亮该扇形块和后代元素，其他元素将被淡化（downplay，参见 itemStyle）；如果其值为 'ancestor'，则会高亮该扇形块和祖先元素；如果其值为 'self' 则只高亮自身；'none' 则不会淡化其他元素。
          // nodeClick: 'rootToNode' , // false：节点点击无反应。'rootToNode'：点击节点后以该节点为根结点。'link'：如果节点数据中有 link 点击节点后会进行超链接跳转。
          // renderLabelForZeroData: true , // 如果数据没有 name，是否需要渲染文字。
          data: [
            {
              value: 8,
              name: "阴",
              label: {
                color: '#000',
              },
              itemStyle: {
                color: "#fff"
              },
              children: [
                {
                  value: 2,
                  name: "坤土",
                  itemStyle: {
                    color: color[0]
                  },
                },
                {
                  value: 2,
                  name: "兑金",
                  itemStyle: {
                    color: color[1]
                  },
                },
                {
                  value: 2,
                  name: "乾金",
                  itemStyle: {
                    color: color[2]
                  },
                },
                {
                  value: 2,
                  name: "坎水",
                  itemStyle: {
                    color: color[3]
                  },
                }
              ]
            },
            {
              value: 8,
              name: "阳",
              label: {
                color: '#fff',
              },
              itemStyle: {
                color: "#000"
              },
              children: [
                {
                  value: 2,
                  name: "艮土",
                  itemStyle: {
                    color: color[4]
                  },
                },
                {
                  value: 2,
                  name: "震木",
                  itemStyle: {
                    color: color[5]
                  },
                },
                {
                  value: 2,
                  name: "巽木",
                  itemStyle: {
                    color: color[6]
                  },
                },
                {
                  value: 2,
                  name: "离火",
                  itemStyle: {
                    color: color[7]
                  },
                }
              ]
            }
          ],
          label: { // 描述了每个扇形块中，文本标签的样式。
            // color: '#fff',
            // textBorderColor: '#666',
            // textBorderWidth: 2,
            // borderColor: '#999',
            // borderWidth: 1,
            rotate: 0,
            // position: 'top',
            // distance: 100,
            // formatter: function (param) {
            //   var depth = param.treePathInfo.length;
            //   if (depth === 2) {
            //     return param.name;
            //   }
            //   else if (depth === 3) {
            //     return param.name;
            //   }
            //   else if (depth === 4) {
            //     return param.name;
            //   }
            // }
          },
          emphasis: { // 鼠标悬停后的配置项。
            label: {
              color: '#fff',
              textBorderColor: '#666',
              textBorderWidth: 2,
              borderColor: '#999',
              borderWidth: 1,
              rotate: 0,
              // position: 'top',
              // distance: 100,
              // formatter: function (param) {
              //   var depth = param.treePathInfo.length;
              //   if (depth === 2) {
              //     return param.name;
              //   }
              //   else if (depth === 3) {
              //     return param.name;
              //   }
              //   else if (depth === 4) {
              //     return param.name;
              //   }
              // }
            },
            // itemStyle: {
              //...
            // },
          },
          highlight: { // 鼠标悬停后相关扇形块的配置项。
            label: {
              color: '#fff',
              textBorderColor: '#666',
              textBorderWidth: 2,
              borderColor: '#999',
              borderWidth: 1,
              rotate: 0,
              // position: 'top',
              // distance: 100,
              // formatter: function (param) {
              //   var depth = param.treePathInfo.length;
              //   if (depth === 2) {
              //     return param.name;
              //   }
              //   else if (depth === 3) {
              //     return param.name;
              //   }
              //   else if (depth === 4) {
              //     return param.name;
              //   }
              // }
            },
            // 同上
          },
          downplay: { // 鼠标悬停后不相关扇形块的配置项。
            // 同上
            label: {},
            itemStyle: {
              color: "#ccc"
            },
          },
          levels: [ // 多层配置
            {
              // 留给数据下钻点的空白配置
            },
            { // 最靠内测的第一层
              r0: '0%',
              // r: '35%',
              // itemStyle: {
              //   color: 'red'
              // },
              // label: { // 文字
              //   rotate: 'radial', // 'radial' 表示径向旋转
              //   distance: 10 ,
              //   position: 'inside' ,
              //   align: 'center' // 文字对齐方式，可取值为：'left'、 'center'、 'right'。注意，'left' 是指靠近内圈，而 'right' 是指靠近外圈。
              // }
            },
            { // 第二层 ...
              // itemStyle: {
              //   color: "yellow"
              // },
              // label: {
              //   rotate: 'tangential' // 'tangential' 表示切向旋转。
              // }
            },
            {
              // itemStyle: {
              //   color: color
              // },
              label: {
                padding: 3,
                position: 'outside',
              //   rotate: 0 // 默认径向旋转，如果不需要文字旋转，可以将其设为 0。
              }
            }
          ]
        }
      }
    }
  }

  componentDidMount() {
    this.drawChart()
  }

  drawChart() {
    const { seriesData, option } = this.state;
    this.chartDom = document.getElementById("domId");
    this.myChart = echarts.init(this.chartDom);
    if (seriesData) {
      option.series = seriesData
    }
    // console.log(this.myChart, seriesData, option)
    this.myChart.setOption(option);
  }

  render() {

    return (
      <div className="Sunburst">
        <div id="domId"></div>
      </div>
    )
  }
}

export default Sunburst;