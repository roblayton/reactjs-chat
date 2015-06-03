var React = require('react');

var TextBox = React.createClass({
  render: function() {
    return (
      <form className="textbox">
        <input></input>
        <input type="submit"></input>
      </form>
    )
  }
});

module.exports = TextBox;
