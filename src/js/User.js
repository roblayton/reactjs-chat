var React = require('react');

var User = React.createClass({
  render: function() {
    return <li>{ this.props.name }</li>
  }
});

module.exports = User;
