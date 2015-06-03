var React = require('react');

var User = React.createClass({
  render: function() {
    console.log(this.props);
    return <li>{ this.props.name }</li>
  }
});

module.exports = User;
