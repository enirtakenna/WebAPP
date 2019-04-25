var UsersView = React.createClass({
    propTypes: {
        //users: React.PropTypes.array.isRequired,
        newUser: React.PropTypes.object.isRequired,
        onNewUserChange: React.PropTypes.func.isRequired,
        //removeUser: React.propTypes.func.isRequired,
    },

    render: function() {
        return (
            React.createElement('div', {className: 'UsersView'},
                React.createElement('h1', {className: 'UsersView-title'}),
                React.createElement('ul', {className: 'UsersView-list'},
                    React.createElement('li', {className: "UserView-element"}), // this is the list element
                    // ANDREA, i want to create a new list element by every page load, like in your socket example.
                ),

            )
        )
    },

});

