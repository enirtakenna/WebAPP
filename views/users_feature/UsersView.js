var UsersView = React.createClass({
    propTypes: {
        //users: React.PropTypes.array.isRequired,
        newUser: React.PropTypes.object.isRequired,
        onNewUserChange: React.PropTypes.func.isRequired,
        //onNewUserCollapse: React.PropTypes.func.isRequired,
        //remove: React.propTypes.func.isRequired,
    },

    render: function() {
        return (
            React.createElement('div', {className: 'UsersView'},
                React.createElement('h1', {className: 'UsersView-title'}),
                React.createElement('ul', {className: 'UsersView-list'},
                    React.createElement('li', {className: "UserView-element"}),
                    React.createElement('li', {className: "UserView-element"})),
                    //this.props.users.map(function(user) {
                      //  return React.createElement(UserItem, user)
                    //  }),
                React.createElement(UserForm, {
                    value: this.props.newUser,
                    onChange: this.props.onNewUserChange,
                    // onPageCollapse: this.props.onNewUserCollapse,
                })
            )
        )
    },
});
