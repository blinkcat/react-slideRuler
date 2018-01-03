/**
 * Created by simba on 01/02/2018.
 */
import React from 'react';
import s from './index.scss'

class SlideRuler extends React.Component {

  constructor() {
    super();
    this.state = {
      containerWidth: window.screen.width || 375,
      canvasHeight: 83,
      canvasWidth: 375,
      scrollLeft: 0,
      heightDecimal: 50,
      heightDigit: 25,
      lineWidth: 2,
      colorDecimal: '#909090',
      colorDigit: '#b4b4b4',
      divide: 10,
      precision: 0.1,
      fontSize: 20,
      fontColor: '#666666',
      maxValue: 190,
      minValue: 30,
      currentValue: 60
    };

    this.initCanvas = this.initCanvas.bind(this);
    this.initDates = this.initDates.bind(this);
    this.drawRuler = this.drawRuler.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.getCurrentValue = this.getCurrentValue.bind(this);
  }

  componentDidMount(){
    this.initCanvas(this.props);
  }

  componentWillReceiveProps(nextProps){
    this.initDates(nextProps);
  }

  initCanvas(dates){
    new Promise((resolve, reject)=>{
      resolve(this.initDates(dates))
    }).then((data)=>{
        this.props.getCurrentValue && this.handleCurrentValue();
    })
  }

  initDates(dates){
    let maxValue = dates.maxValue || this.state.maxValue;
    let minValue = dates.minValue || this.state.minValue;
    let currentValue = dates.currentValue || this.state.currentValue;
    let divide = dates.divide || this.state.divide;
    let precision = dates.precision || this.state.precision;
    let containerWidth = dates.containerWidth || this.state.containerWidth;
    let canvasWidth = (maxValue/precision * divide + containerWidth - minValue/precision * divide) || this.state.canvasWidth;
    let scrollLeft = (currentValue - minValue) * divide || this.state.scrollLeft;

    this.setState({
      containerWidth: dates.containerWidth || this.state.containerWidth,
      canvasHeight: dates.canvasHeight || this.state.canvasHeight,
      canvasWidth: canvasWidth,
      scrollLeft: scrollLeft,
      heightDecimal: dates.heightDecimal || this.state.heightDecimal,
      heightDigit: dates.heightDigit || this.state.heightDigit,
      lineWidth: dates.lineWidth || this.state.lineWidth,
      colorDecimal: dates.colorDecimal || this.state.colorDecimal,
      colorDigit: dates.colorDigit || this.state.colorDigit,
      divide: dates.divide || this.state.divide,
      precision: dates.precision || this.state.precision,
      fontSize: dates.fontSize || this.state.fontSize,
      fontColor: dates.fontSize || this.state.fontColor,
      maxValue: dates.maxValue || this.state.maxValue,
      minValue: dates.minValue || this.state.minValue,
      currentValue: dates.currentValue || this.state.currentValue
    },()=>{
      this.drawRuler();
  })
  }

  drawRuler(){
    /* 1.定义变量 */

    // 1.1 定义原点，x轴方向起点与终点各留半屏空白
    let origion = {x: this.state.containerWidth, y: this.state.canvasHeight * 2};
    // 1.2 定义刻度线样式
    let heightDecimal = this.state.heightDecimal * 2;
    let heightDigit = this.state.heightDigit * 2;
    let colorDecimal = this.state.colorDecimal;
    let colorDigit = this.state.colorDigit;
    // 1.3 定义刻度字体样式
    let fontSize = this.state.fontSize * 2;
    let fontColor = this.state.fontColor;
    // 1.4 总刻度值
    let maxValue = this.state.maxValue,minValue = this.state.minValue;
    // 1.5 每个刻度所占位的px
    let divide = this.state.divide * 2;
    // 1.6定义每个刻度的精度
    let precision = this.state.precision;

    /* 2.绘制 */

    // 2.1初始化context
    let canvas = this.refs.SlideRuler,
        context = canvas.getContext('2d');
    // 遍历maxValue
    for (var i = minValue/precision; i <= maxValue/precision; i++) {
      context.beginPath();
      // 2.2 画刻度线
      context.moveTo(origion.x + (i - minValue/precision) * divide, 0);
      // 画线到刻度高度，10的位数就加高
      context.lineTo(origion.x + (i - minValue/precision) * divide, i* 2 % divide == 0 ? heightDecimal : heightDigit);
      // 设置属性
      context.lineWidth = this.state.lineWidth  * 2;
      // 10的位数就加深
      context.strokeStyle = (i % divide == 0) ? colorDecimal : colorDigit;
      // 描线
      context.stroke();
      // 2.3 描绘刻度值
      context.fillStyle = fontColor;
      context.textAlign = "center";
      context.textBaseline = "top";
      if (i* 2 % divide == 0) {
        context.font = `${fontSize}px Arial`;
        context.fillText(i * precision, origion.x + (i - minValue/precision) * divide, heightDecimal);
      }
      context.closePath();
    }
  }

  handleScroll(e){
    let scrollLeft = e.target.scrollLeft;
    window.requestAnimationFrame(() => this.getCurrentValue(scrollLeft));
  }

  //通过滚动计算当前值
  getCurrentValue(scrollLeft){
    let currentValue = scrollLeft * this.state.precision / this.state.divide + this.state.minValue;
    let precision = this.state.precision.toString().split('.')[1].length;
    currentValue = precision > 0 ? Math.round(currentValue*(10*precision))/(10*precision) : currentValue;
    this.props.getCurrentValue && this.props.getCurrentValue(currentValue);
  }

  //通过当前值计算滚动距离
  handleCurrentValue(){
    let scrollLeft = (this.state.currentValue - this.state.minValue) * this.state.divide / this.state.precision;
    this.refs.rulerBox.scrollLeft = scrollLeft;
  }

  render() {

    return (
        <div className={s.container}>
  <div className={s.rulerBox} onScroll={this.handleScroll} ref='rulerBox'>
        <canvas ref='SlideRuler' style={{width:this.state.canvasWidth,height:this.state.canvasHeight}} width={this.state.canvasWidth * 2} height={this.state.canvasHeight * 2}></canvas>
    </div>
    </div>
  );
  }
}

export default SlideRuler;
