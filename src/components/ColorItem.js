import React, {Component} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import '../App.css';


class ColorItem extends Component {
  constructor (props) {
    super(props);

    this.state = {
      copied: false,
    }

    this.color = this.props.color;
  }

  render () {
    let square = {
        width: 200,
        height: 200,
        backgroundColor: this.color.code,
        textAlign: 'center',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return (
        <CopyToClipboard style={square} text={this.color.code}
           onCopy={() => this.setState({copied: true})}>
           <div>{this._showAlert()}</div>
         </CopyToClipboard>
    )
  }

  _showAlert () {
    let self = this;

    if (this.state.copied) {
      setTimeout (function () {
        self.setState({copied: false});
      },1000);
      return (
        <div className="alertBox">Copied!</div>
      )
    }
  }
}

export default ColorItem;
