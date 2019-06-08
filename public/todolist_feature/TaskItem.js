

var TaskItem = React.createClass({
    propTypes: {
        description: React.PropTypes.string,
    },



    render: function() {
        return (
            React.createElement('div', {className: 'TaskItem'},
                React.createElement('div', {className: 'EventItem-description'}, this.props.description,
                    React.createElement('input',{style: {margin: '1em'}, className: 'TaskCheckbox', type: 'checkbox', id: 'checkbox', defaultChecked: false}),
                    React.createElement('button', {type: 'submit', className: "button btn btn-light btn-sm"}, "Remove",
                    )
                )
            )
        )
    },
});

