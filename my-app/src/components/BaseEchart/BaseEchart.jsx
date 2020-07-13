import React, { Component } from "react";
import "./BaseEchart.less";
import PropTypes from "prop-types"; // 使用上下文
import connect from "react-redux/es/connect/connect";
import echarts from "echarts";
import actions from '../../store/action';
let mTime = null;

class BaseEchart extends Component {
  // constructor(props) {
  //   super(props);
  // };

  componentDidMount() {
    this.chartDom = document.getElementById(this.props.domId);
    this.drawChart()
    //屏幕缩放的时候，重绘Echart
    window.addEventListener("resize", () => {
      this.myChart && this.myChart.resize();
    })
  }

  // UNSAFE_componentWillMount,
  componentWillReceiveProps(nextProps) {
    if (nextProps.seriesData !== this.props.seriesData) {
      this.resetChart(true)
    }
    //判断redux中的，关于尺寸大小的数据是否改变，进行重绘
    console.log(nextProps)
    if (nextProps.htmlFontSize !== this.props.htmlFontSize) {
      this.resetChart(true)
    }
  }

  componentWillUnmount() {
    clearInterval(mTime)
  }

  getCommonOption = (isXaxis = true) => {
    return {
      axisLabel: {
        color: "rgba(255,255,255,.7)",
        interval: 0,
        rotate: isXaxis ? 0 : 0, //旋转角度
        margin: 15,
        fontSize: 16,
        showMinLabel: true,
        showMaxLabel: true
      },
      nameTextStyle: {
        color: "rgba(255,255,255,.7)",
        backgroundColor: "transparent"//透明
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,.7)",
          width: 2,
        }
      },
      axisTick: {
        show: false,
        alignWithLabel: true
      },
      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,.7)",
          width: 2,
        }
      }
    }
  }

  drawChart(seriesData = this.props.seriesData) {
    if (!this.chartDom) return;
    this.myChart = echarts.init(this.chartDom);
    const { dataZoomEnd } = this.props;
    const baseXaxisConfig = this.getCommonOption();
    const baseYaxisConfig = this.getCommonOption(false)
    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross"//"shadow"阴影指示器、'line' 直线指示器、'none' 无指示器、'cross' 十字准星指示器
        },
        backgroundColor: "rgba(12, 47, 107, 0.75)",
        extraCssText: "box-shadow: 0.1rem 0.1rem 0.2rem 0 rgba(0, 0, 0, 0.5)"
      },
      textStyle: {
        color: "rgba(255,255,255,.7)"
      },
      legend: {
        right: "4%",
        itemWidth: 16,
        itemHeight: 16,
        itemGap: 16,
        icon: "stack",
        textStyle: {
          color: "#909295",
          fontSize: 16
        }
      },
      grid: [
        {
          x: "8%",
          y: "13%",
          width: "88%",
          height: "65%"
        }
      ],
      xAxis: {
        type: "category",
        boundaryGap: true,
        nameLocation: "middle",
        ...baseXaxisConfig
      },
      yAxis: {
        type: "value",
        ...baseYaxisConfig
      },
      series: seriesData
    };
    if (dataZoomEnd > 0) {
      option.dataZoom = [
        {
          type: "slider",
          start: 0,
          end: dataZoomEnd,
          height: 7,
          width: 15,
          bottom: 3,
          left: "center",
          showDetail: false,
          borderColor: "rgba(0, 163, 255, 1)",
          backgroundColor: "rgba(0, 163,255,0.2)",
          zoomOnMouseWheel: false,
          moveOnMouseMove: true,
          realtime: true,
          handleIcon: "m10.7,11.9v-1.3h9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4c19.5,16.3,15.6,12.2,10.7,11.9z m13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
          handleSize: "130%",
          handleStyle: {
            color: "#fff",
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 3,
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        },
        {
          type: "inside",
          start: 0,
          end: dataZoomEnd,
          height: 5,
          top: "bottom",
          showDetail: false,
          borderColor: "transparent",
          zoomOnMouseWheel: false
        }
      ]
    }
    this.props.option.yAxis instanceof Array && (option.yAxis = this.props.option.yAxis);
    this.myChart.clear();
    this.myChart.setOption(option);
    this.myChart.setOption(this.props.option);
    if (this.props.dispatchAction) { //tooltip 自动播放
      let index = 0; //播放所在下标
      mTime = setInterval(() => {
        this.myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index
        });
        index++;
        if (index >= this.props.seriesData[0].data.length) {
          index = 0;
        }
      }, 1000)
    }
  }

  resetChart = (isDraw = false) => {
    if (!this.myChart) return;
    this.myChart.clear();
    this.myChart.dispose();
    if (isDraw) {
      this.drawChart()
    }
  }

  render() {
    console.log(this.props.htmlFontSize)
    const { title, seriesData, domId, noneDataTips } = this.props;
    return (
      <div className="BaseEchart-container">
        <div className="baseChart-title">{title}</div>
        {
          seriesData.length > 0 ? <div className="chart-container">
            <div id={domId} className="chart-content"></div>
          </div> : <div className="nodata-tip center-y center-x">{noneDataTips}</div>
        }
      </div>
    )
  }
}

// 上下文，定义数据类型和初始值
BaseEchart.propTypes = {
  domId: PropTypes.string,
  title: PropTypes.string,
  seriesData: PropTypes.array,
  option: PropTypes.object,
  noneDataTips: PropTypes.string,
  dataZoomEnd: PropTypes.number,
  dispatchAction: PropTypes.bool,
}

BaseEchart.defaultProps = {
  domId: `${new Date().getTime() + Math.floor(Math.random() * 1000)}BaseEchart`,
  option: {},
  noneDataTips: "暂无数据",
  dataZoomEnd: 0,
  seriesData: [],
  title: "",
  dispatchAction: false
}

// export default BaseEchart

export default connect(state => state, actions)(BaseEchart);