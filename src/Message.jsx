import React, {Component} from 'react';

class Message extends Component {
  render() {
    //The colour is generated on the server side. The data is then inserted into the messagelist props
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