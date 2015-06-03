var React = require('react');
var Messages = require('./Messages');
var TextBox = require('./TextBox');

var Public = React.createClass({
  render: function() {
    return (
      <div id="public-wrapper">
        <Messages /><br/>
        <TextBox />
      </div>
    )
  }
});

module.exports = Public;
