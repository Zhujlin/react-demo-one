import React, { Component } from "react";
import "./Graph.less";
import echarts from "echarts";

// 关系图

class Graph extends Component {
  constructor() {
    super();
    this.state = {
      option: {
        textStyle: {
          color: '#333',
          fontSize: 16,
          fontWeight: 600,
        },
        xAxis: {
          show: false,
          type: 'value'
        },
        yAxis: {
          show: false,
          type: 'value'
        },
        series: [{
          type: 'graph',
          layout: 'none', // 图的布局。'none' 不采用任何布局，'circular' 采用环形布局，'force' 采用力引导布局，
          //圆形上面的文
          label: {
            normal: {
              position: "inside",
              show: true,
              textStyle: {
                fontSize: 12
              }
            }
          },
          //线
          lineStyle: {
            normal: {
              width: 1,
              shadowColor: 'none',
              color: '#ff0000'
            }
          },
          data: [
            {
              name: "因子",
              symbolSize: 80,
              x: 100,
              y: 200,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#157eff'
                  }, {
                    offset: 1,
                    color: '#35c2ff'
                  }]),
                },
                // shadowBlur: 10
              },
            },
            { // 第二层
              name: "so2",
              symbol: "rect",
              x: 200,
              y: 180,
              symbolSize: [80, 30],
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#45D840'
                  }, {
                    offset: 1,
                    color: '#B7FF7D'
                  }]),
                }
              }
            }, {
              name: "pm25",
              symbol: "rect",
              x: 200,
              y: 220,
              symbolSize: [80, 30],
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#45D840'
                  }, {
                    offset: 1,
                    color: '#B7FF7D'
                  }]),
                }
              }
            }, { // 第三层
              name: "1号检测仪",
              x: 300,
              y: 180,
              symbol: "circle",
              symbolSize: [100, 40],
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#ffb402'
                  }, {
                    offset: 1,
                    color: '#ffdc84'
                  }]),
                }
              }
            }, {
              name: "2号检测仪",
              x: 300,
              y: 220,
              symbol: "roundRect",
              symbolSize: [100, 40],
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#ffb402'
                  }, {
                    offset: 1,
                    color: '#ffdc84'
                  }]),
                }
              }
            }, { // 第四份
              name: "实体A",
              symbolSize: 80,
              x: 400,
              y: 200,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#157eff'
                  }, {
                    offset: 1,
                    color: '#35c2ff'
                  }]),
                }
              },
            }
          ],
          links: [
            {
              source: "因子",
              value: " ",
              target: "so2",
            }, {
              source: "因子",
              value: " ",
              target: "pm25",
            }, {
              source: "so2",
              value: " ",
              target: "1号检测仪",
            }, {
              source: "pm25",
              value: " ",
              target: "2号检测仪",
            }, {
              source: "1号检测仪",
              value: " ",
              target: "实体A",
            }, {
              source: "2号检测仪",
              value: " ",
              target: "实体A",
            }
          ],
        }]
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
    this.myChart.setOption(option);
  }

  render() {
    return (
      <div className="Graph">
        <div id="domId"></div>
      </div>
    )
  }
}

export default Graph;