# SlideRuler
SlideRuler component for ReactJS

[![npm](https://img.shields.io/npm/v/slide-ruler.svg)](https://www.npmjs.com/package/slide-ruler)
[![npm](https://img.shields.io/npm/dy/slide-ruler.svg)](https://www.npmjs.com/package/slide-ruler)
[![npm](https://img.shields.io/npm/l/slide-ruler.svg)](https://www.npmjs.com/package/slide-ruler)

![example](http://chuantu.biz/t6/198/1515223694x-1404758279.gif)

## Getting Started

### Install

```shell
yarn add slide-ruler --dev
```

### Usage Example

```javascript
import React from 'react';
import SlideRuler from 'slide-ruler';

class IndexPage extends React.Component {

  constructor() {
    super();

    this.state = {
      currentValue: 0
    };

    this.getCurrentValue = this.getCurrentValue.bind(this);
  }

  getCurrentValue(currentValue){
    this.setState({
      currentValue:currentValue
    })
  }

  render() {
    return (
      <div>
        <p>{this.state.currentValue}</p>
        <SlideRuler getCurrentValue={this.getCurrentValue}
                    maxValue={200}
                    minValue={20}
                    divide={5} 
      			   precision={0.1}/>
      </div>
    );
  }
}

export default IndexPage;

```

## PropTypes

| Property        | Type     | Default      | Description           |
| :-------------- | :------- | :----------- | :-------------------- |
| getCurrentValue | Function |              | get the return value  |
| containerWidth  | Nubmer   | screen width | container width       |
| canvasHeight    | Nubmer   | 83           | container height      |
| heightDecimal   | Nubmer   | 35           | scale marks length    |
| heightDigit     | Nubmer   | 18           | division marks length |
| lineWidth       | Nubmer   | 2            | marks width           |
| colorDecimal    | Color    | #909090      | scale marks color     |
| colorDigit      | Color    | #b4b4b4      | division marks color  |
| divide          | Nubmer   | 10           | division length of px |
| precision       | Nubmer   | 1            | division value        |
| fontSize        | Nubmer   | 20           | scale fontSize        |
| fontColor       | Nubmer   | #666666      | scale fontColor       |
| maxValue        | Function | 230          | max value             |
| minValue        | Function | 100          | min value             |
| currentValue    | Function | 0            | current value         |


## License

[**The MIT License**](http://opensource.org/licenses/MIT).