var TaskItem = React.createClass({
    propTypes: {
        description: React.PropTypes.string,
        id: React.PropTypes.string.isRequired,
    },

    render: function() {
        return (
            React.createElement('div', {className: 'TaskItem'},
                React.createElement('div', {className: 'TaskItem-description'}, this.props.description,
                    React.createElement('input',{className: 'TaskCheckbox', type: 'checkbox', id: 'checkbox', defaultChecked: false}),
                    React.createElement('button', {onClick: this.onClick, type: 'submit', className: "button btn btn-light", id: this.props.id}, "Delete",
                    )
                )
            )
        )
    },
});

