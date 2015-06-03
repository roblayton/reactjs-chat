var React = require('react');
var User = require('./User');

var UserList = React.createClass({
  render: function() {
    var users = this.props.users.map(function(u) {
      return <User key={Math.random() * 9999} name={u} />
    });

    return (
      <div id="users">
        <h2>Users</h2>
        <ul>
          { users } 
        </ul>
      </div>
    )
  }
});

module.exports = UserList;
