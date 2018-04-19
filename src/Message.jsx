import React, {Component} from 'react';

class Message extends Component {
  render() {
    let colour = {color: this.props.colour};
    return (
        <div className="message">
          <span className="message-username" style={colour}>{ this.props.username }</span>
          <span className="message-content">{ this.props.content }</span>
          <img className="image" src={ this.props.image }/>
        </div>
    );
  }
}
export default Message;