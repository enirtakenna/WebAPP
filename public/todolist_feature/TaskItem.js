

var TaskItem = React.createClass({
    propTypes: {
        description: React.PropTypes.string,
    },



    removeTask(name, i){
        let task = this.state.task.slice();
        task.splice(i, 1);
        this.setState({
            task
        });
    },

    render: function() {
        return (
            React.createElement('div', {className: 'TaskItem'},
                React.createElement('div', {className: 'EventItem-description'}, this.props.description,
                    React.createElement('input',{className: 'TaskCheckbox', type: 'checkbox', id: 'checkbox', defaultChecked: false}),
                    React.createElement('button', {onClick: this.props.remove,type: 'submit', className: "button btn btn-light"}, "Delete",
                    )
                )
            )
        )
    },
});

