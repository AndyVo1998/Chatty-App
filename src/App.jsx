import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    this.ws = new WebSocket('ws://localhost:3001/');
    if(this.ws) {
      console.log("Conntected to Server")
    }
    this.ws.addEventListener('message', event => {
      const messageObj = JSON.parse(event.data);
      this.setState({messages: this.state.messages.concat(messageObj)})
    })
  }

    onNewMessage(username, content) {
    const newMessage = {username: username, content: content}
    this.ws.send(JSON.stringify(newMessage));
  }

  render() {
    return (<div>
              <NavBar />
              <MessageList messages={ this.state.messages } />
              <ChatBar addMessage={this.onNewMessage.bind(this)}/>
            </div>
    );
  }
}
export default App;
