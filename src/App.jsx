import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: [],
      size: 0,
    }
  }

  componentDidMount() {
    //Upon the creation of the component the following will run...
    this.ws = new WebSocket('ws://localhost:3001/');
    if(this.ws) {
      console.log('Conntected to Server')
    }
    //the following function listens for messages from the websocket
    this.ws.addEventListener('message', event => {
      const messageObj = JSON.parse(event.data);
      //Listens for an update for how many clients are connected
      if (messageObj.type === 'size') {
        this.setState({
          size: messageObj.numSize,
        })
      }
      //listens for chat messages
      if (messageObj.type === 'chat' && messageObj.content !== '') {
        this.setState({messages: this.state.messages.concat(messageObj)})
      }
      //listens for notifications (name changes)
      if (messageObj.type === 'notif' && this.state.currentUser.name !== '') {
        messageObj.username = null;
        this.setState({messages: this.state.messages.concat(messageObj)})
      }
    })
  }

    //This function is passed to chatbar via props
    onNewMessage(username, content) {
      let url = content.match(/(http)?s?:?(\/\/[^“’]*\.(?:png|jpg|jpeg|gif|png|svg))/g);
      content = content.split(url);
      this.state.currentUser.name = username;
      const newMessage = {type: 'postmsg', username: this.state.currentUser.name, content: content, image: url};
      //Creates an object and sends the data to the websocket
      this.ws.send(JSON.stringify(newMessage));
  }

    //This function is also passed to chatbar
    onNewCurrent(username) {
      let oldUser = this.state.currentUser.name;
      this.state.currentUser.name = username;
      const newMessage = {type: 'postnotif', username, oldUser};
      //This function only sends data necessary to update the name of the user
      this.ws.send(JSON.stringify(newMessage));
    }

  render() {
    return (<div>
              <NavBar size={ this.state.size } />
              <MessageList messages={ this.state.messages } />
              <ChatBar user={this.state.currentUser.name} userNotif={this.onNewCurrent.bind(this)} addMessage={this.onNewMessage.bind(this)}/>
            </div>
    );
  }
}
export default App;
