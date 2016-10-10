import React, {Component} from 'react';
import ColorsData from '../data/colorsData';
import ColorItem from './ColorItem';
import '../App.css';

class Colors extends Component {
  constructor (props) {
    super(props);

    this.state = {
      selected: true,
      item: 0,
      loaded: false,
      orderBy: 'hue'
    }
  }

  render () {
    let selected = {
      backgroundColor: 'black',
      color: 'white',
      padding: 5
    }
      return (
      <div className="body-container">
        <div className="order-container">
          <p>Order By</p>
          <p style={selected} onClick={() => {this.setState({orderBy:'sat'})}}>Saturation</p>
          <p onClick={() => {this.setState({orderBy:'hue'})}}>Hue</p>
          <p onClick={() => {this.setState({orderBy:'val'})}}>Value</p>
        </div>
        <div className="colors-container">
        {this._sortColors(this.state.orderBy).map(function (item, index) {
            return (<ColorItem key={index} color={item}/>)
          })
        }
        </div>
      </div>
      )
    }

  _parseColors () {
    let colorsJson = ColorsData.colors,
        colors = [];

        for (let i = 0; i < colorsJson.length; i++) {
          colors.push(colorsJson[i]);
        }

      return colors;
  }

  _sortColors (orderBy) {
    console.log(orderBy);
    let colors = this._parseColors();
    for (let c = 0; c < colors.length; c++) {

        let code = colors[c].code.substring(1);
        let r = parseInt(code.substring(0,2),16)/255;
        let g = parseInt(code.substring(2,4),16)/255;
        let b = parseInt(code.substring(4,6),16)/255;
        let max = Math.max.apply(Math, [r,g,b]);
        let min = Math.min.apply(Math, [r,g,b]);
        let chr = max-min;
        let hue = 0;
        let val = max;
        let sat = 0;

        if (val > 0) {
            sat = chr/val;
            if (sat > 0) {
                if (r == max) {
                    hue = 60*(((g-min)-(b-min))/chr);
                    if (hue < 0) {hue += 360;}
                } else if (g == max) {
                    hue = 120+60*(((b-min)-(r-min))/chr);
                } else if (b == max) {
                    hue = 240+60*(((r-min)-(g-min))/chr);
                }
            }
        }

        switch (orderBy) {
          case 'hue':
            colors[c].order = hue;
            break;
          case 'sat':
            colors[c].order = sat;
            break;
          case 'val':
            colors[c].order = val;
          default:
            colors[c].order = hue;
        };
    }
    return colors.sort(function(a,b){return a.order - b.order;});
  }
}

export default Colors;
