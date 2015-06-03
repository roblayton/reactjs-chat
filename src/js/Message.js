var React = require('react');

var Message = React.createClass({
  render: function() {
    return (
      <li className="message">
        <span className="user">{ this.props.user }:</span> 
        <span className="content">{ this.props.content }</span>
      </li>
    )
  }
});

module.exports = Message;
