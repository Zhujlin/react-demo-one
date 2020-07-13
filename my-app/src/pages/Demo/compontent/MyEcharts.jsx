import React, { Component } from "react";
import "./MyEcharts.less";
import echarts from "echarts";
class MyEcharts extends Component {
  constructor() {
    super();
    this.state = {
      option: {
        title: {
          text: '基础雷达图'
        },
        tooltip: {},
        legend: {
          data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
        },
        radar: {
          shape: 'circle', // 'polygon'多边形， 'circle'圆圈
          name: {
            textStyle: {
              color: '#666',
              // backgroundColor: '#999',
              // borderRadius: 3,
              // padding: [3, 5]
            }
          },
          indicator: [
            { name: '销售（sales）', max: 6500 },
            { name: '管理（Administration）', max: 16000 },
            { name: '信息技术（Information Techology）', max: 30000 },
            { name: '客服（Customer Support）', max: 38000 },
            { name: '研发（Development）', max: 52000 },
            { name: '市场（Marketing）', max: 25000 }
          ],
          nameGap: 20, // 指标离图的距离
          // axisLine: { // ?
          //   show: true
          // },
          // axisTick: { // ?
          //   show: false
          // },
          // splitLine: { // 分割线
          //   show: false
          // },
          // axisLabel: { // ?
          //   show: false,
          //   lineStyle: {
          //     show: false
          //   }
          // },
          splitArea: {  // 背景色
            show: false
          }
        },
        series: [{
          name: '预算 vs 开销（Budget vs spending）',
          type: 'radar',
          emphasis: { // 高亮的样式设置
            lineStyle: {
              width: 5,
              shadowOffsetX: 1,
              shadowOffsetY: 1,
              shadowBlur: 8,
              shadowColor: "rgba(0, 0, 0, 0.2)"
            }
          },
          lineStyle: {
            normal: {
              width: 1
            }
          },
          data: [
            {
              value: [4300, 10000, 28000, 35000, 50000, 19000],
              name: '预算分配（Allocated Budget）',
              lineStyle: {
                normal: {
                  width: 3
                }
              },
              itemStyle: {
                normal: {
                  color: "#427Aff"
                }
              },
            },
            {
              value: [5000, 14000, 28000, 31000, 42000, 21000],
              name: '实际开销（Actual Spending）',
              areaStyle: { // 区域填充样式。（不写，默认不绘制）
                color: "#000",
                opacity: 0.1, // 0时，为不绘制图形
              }
            }
          ]
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
    // console.log(this.myChart, seriesData, option)
    this.myChart.setOption(option);
  }

  render() {

    return (
      <div className="MyEcharts">
        <div id="domId"></div>
      </div>
    )
  }
}

export default MyEcharts;