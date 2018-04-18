import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      content: ''
    };
  }

  handleNameChange(event) {
    this.setState({username: event.target.value});
  }

  handleContentChange(event) {
    this.setState({content: event.target.value});
  }

  handleEnterKey(event) {
    let username = this.state.username ? this.state.username : "Anonymous"
    if (event.key === 'Enter') {
      this.props.addMessage(username, this.state.content);
      this.setState({content: ''})
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbarUsername" placeholder="Your Name (Optional)" value={this.state.username} onChange={this.handleNameChange.bind(this)}/>
        <input className="chatbarMessage" placeholder="Type a message and hit ENTER" name="message" onKeyUp={this.handleEnterKey.bind(this)} value={this.state.content} onChange={this.handleContentChange.bind(this)}/>
      </footer>
    );
  }
}
export default ChatBar;