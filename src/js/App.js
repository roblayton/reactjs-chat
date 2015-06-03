var React = require('react');
var UserList = require('./UserList');
var MessageList = require('./MessageList');
var MessageForm = require('./MessageForm');

var socket = io.connect();

var App = React.createClass({
  getInitialState: function() {
    socket.on('init', this.initialize);
    socket.on('send:message', this.messageReceived);
    socket.on('user:join', this.userJoined);
    socket.on('user:left', this.userLeft);
    
    return { users: [], messages: [], content: "" };
  },
  initialize: function(data) {
    this.setState({ users: data.users, user: data.name });
  },
  messageReceived: function(message) {
    this.state.messages.push(message);
    this.forceUpdate(); 
  },
  userJoined: function(data) {
    this.state.users.push(data.name);
    this.state.messages.push({
      user: "BOT",
      content: data.name + " has entered the room"
    });
    this.forceUpdate(); 
  },
  userLeft: function(data) {
    var index = this.state.users.indexOf(data.name);
    this.state.users.splice(index, 1);
    this.state.messages.push({
      user: "BOT",
      content: data.name + " has left"
    });
    this.forceUpdate();
  },
  handleMessageSubmit: function(message) {
    this.state.messages.push(message);
    this.forceUpdate();

    socket.emit('send:message', message);
  },
  render: function() {
    return (
      <div id="app">
        <UserList users={ this.state.users } />
        <MessageList messages={ this.state.messages }/>
        <MessageForm onMessageSubmit={ this.handleMessageSubmit } user={ this.state.user } />
      </div>
    ) 
  }
});

React.render( <App />, document.body);
