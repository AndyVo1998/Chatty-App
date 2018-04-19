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
    this.ws = new WebSocket('ws://localhost:3001/');
    if(this.ws) {
      console.log("Conntected to Server")
    }
    this.ws.addEventListener('message', event => {
      const messageObj = JSON.parse(event.data);
      if (messageObj.type === 'size') {
        this.setState({
          size: messageObj.numSize,
        })
      }
      if (messageObj.type === 'chat' && messageObj.content !== '') {
        this.setState({messages: this.state.messages.concat(messageObj)})
      }
      if (messageObj.type === 'notif' && this.state.currentUser.name !== '') {
        messageObj.username = null;
        this.setState({messages: this.state.messages.concat(messageObj)})
      }
    })
  }

    onNewMessage(username, content) {
      let url = content.match(/(http)?s?:?(\/\/[^“’]*\.(?:png|jpg|jpeg|gif|png|svg))/g)
      // let indexof = content.indexOf(url)
      // let endIndex = indexof + url.length;
      // content.slice(indexof, endIndex);
      content = content.split(url)

      this.state.currentUser.name = username;
      const newMessage = {type: 'postmsg', username: this.state.currentUser.name, content: content, image: url};
      // if (url) {
      //   newMessage.image = url;
      // }
      this.ws.send(JSON.stringify(newMessage));
  }

    onNewCurrent(username) {
      let oldUser = this.state.currentUser.name
      this.state.currentUser.name = username;
      const newMessage = {type: 'postnotif', username, oldUser};
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
