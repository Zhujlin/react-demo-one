import React, { Component } from "react";
import "./Sunburst.less";
import echarts from "echarts";

// 饼图 模仿 旭日图

// const color = ["#e82821", "#fa7e03", "#ecb420", "#c2cc18", "#5dcc12", "#1c9754", "#32d392", "#2cc0e0", "#427aff", "#6f25dc", "#d93beb"]
const originaldata = [
  {
    "value": 60,
    "name": "移动端",
    "children": [
      {
        "value": 40,
        "name": "苹果"
      },
      {
        "value": 10,
        "name": "安卓"
      },
      {
        "value": 10,
        "name": "塞班"
      }
    ]
  },
  {
    "value": 40,
    "name": "PC"
  },
  {
    "value": 40,
    "name": "平板"
  }
];
const color0 = ['#4A6DBF', '#15B3BC', '#FD4440'];
const data0 = [];
for (let i = 0; i < originaldata.length; i++) {
  const obj = originaldata[i];
  data0.push({
    value: obj.value,
    name: obj.name,
    itemStyle: {
      color: color0[i]
    },
    labelLine: {
      length: 40,
      length2: 10
    }
  });
}

const color1 = ['rgba(244,156,31,0.3)', 'rgba(94,140,208,0.3)', 'rgba(198,52,157,0.3)'];
const data1 = [];
for (let i = 0; i < originaldata.length; i++) {
  const obj = originaldata[i];
  const kids = obj.children;
  if (typeof (kids) === 'undefined') {
    data1.push({
      value: obj.value,
      name: obj.name,
      itemStyle: {
        color: 'transparent'
      }
    });
  } else {
    for (let k = 0; k < kids.length; k++) {
      const kid = kids[k];
      data1.push({
        value: kid.value,
        name: kid.name,
        itemStyle: {
          color: color1[k]
        },
        label: {
          normal: {
            position: 'outside',
            formatter: '{b} {d}% ',
            color: '#909090'
          }
        }
      });
    }
  }
  // alert(k);
}

class Sunburst extends Component {
  constructor() {
    super();
    this.state = {
      option: {
        backgroundColor: '#161823',
        series: [{
          name: '访问来源',
          type: 'pie',
          animation: false,
          radius: ['0%', '60%'],
          label: {
            normal: {
              position: 'outside',
              formatter: '{b} {d}% ',
              color: '#fff'
            }
          },
          labelLine: {
            normal: {
              show: true
            },
          },
          data: data0
        },
        {
          name: '访问来源',
          type: 'pie',
          radius: ['60%', '84%'],
          animation: false,
          data: data1
        }
        ],
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