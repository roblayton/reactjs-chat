var React = require('react');

var MessageForm = React.createClass({
  getInitialState: function() {
    return { value: "" };
  },
  handleChange: function(evt) {
    this.setState({ value: evt.target.value });
  },
  onSubmitHandler: function(evt) {
    evt.preventDefault();  
    if (this.state.value !== "") {
      var message = {
        user: this.props.user,
        content: this.state.value
      };
      this.props.onMessageSubmit(message);
      this.setState({ value: "" });
    }
  },
  render: function() {
    return (
      <form id="message-form" onSubmit={this.onSubmitHandler}>
        <input className="textbox" type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" />
      </form>
    )
  }
});

module.exports = MessageForm;
