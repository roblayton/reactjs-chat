var React = require('react'),
    UserList = require('./UserList'),
    MessageList = require('./MessageList'),
    MessageForm = require('./MessageForm');

var socket = io.connect();

var App = React.createClass({
  getInitialState: function() {
    socket.on('init', this.initialize);
    socket.on('send:message', this.messageReceived);
    socket.on('user:joined', this.userJoined);
    socket.on('user:left', this.userLeft);

    socket.emit('metrics:ctr', 'std.sys.init');
    socket.emit('metrics:ctr', 'std.usr.joined');

    return { users: [], messages: [], content: "" };
  },
  initialize: function(data) {
    console.log(data);
    this.setState({ users: data.users, user: data.name });
  },
  messageReceived: function(message) {
    this.state.messages.push(message);
    this.forceUpdate(); 

    socket.emit('metrics:endtmr', 'std.msg.submit');
  },
  userJoined: function(data) {
    this.state.users.push(data.name);
    this.state.messages.push({
      user: "BOT",
      content: data.name + " has entered the room"
    });

    socket.emit('metrics:ctr', 'std.usr.joined');
    this.forceUpdate(); 
  },
  userLeft: function(data) {
    var index = this.state.users.indexOf(data.name);
    this.state.users.splice(index, 1);
    this.state.messages.push({
      user: "BOT",
      content: data.name + " has left"
    });

    socket.emit('metrics:ctr', 'std.usr.left');
    this.forceUpdate();
  },
  handleMessageSubmit: function(message) {
    this.state.messages.push(message);
    this.forceUpdate();

    socket.emit('send:message', message);
    socket.emit('metrics:strtmr', 'std.msg.submit');
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
