var UserItem = React.createClass({
    propTypes: {
        userId: React.PropTypes.string,
        // userIndex: React.PropTypes.value.isRequired, //index prop?
        id: React.PropTypes.string.isRequired,
    },

    render: function() {
        return (
            React.createElement('ul', {className: 'UserItem'},
                React.createElement('li', {className: 'UserItem-userId'}, this.props.userId,
                    React.createElement('div',{className: 'UserElement', id: 'userelement', width: 40, height: 40}),
                )
            )
        )
    },
});

