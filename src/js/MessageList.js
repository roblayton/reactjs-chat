var React = require('react');
var Message = require('./Message');

var MessageList = React.createClass({
  
  render: function() {
    var messages = this.props.messages.map(function(m) {
      return <Message key={Math.random() * 9999} user={ m.user } content={ m.content } />
    });

    return (
      <div id="messages">
        <h2>Messages:</h2>
        <ul>
          { messages }
        </ul>
      </div>
    )
  } 
});

module.exports = MessageList;
