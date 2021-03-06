var TasksView = React.createClass({
    propTypes: {
        tasks: React.PropTypes.array.isRequired,
        newTask: React.PropTypes.object.isRequired,
        onNewTaskChange: React.PropTypes.func.isRequired,
        onNewTaskSubmit: React.PropTypes.func.isRequired,
    },


    render: function() {
        return (
            React.createElement('div', {className: 'TasksView'},
                React.createElement('h1', {className: 'EventsView-title'}, "Tasks"),
                React.createElement('ul', {className: 'EventsView-list'},
                    this.props.tasks.map(function(task) {
                        return    React.createElement(TaskItem, task)
                    })
                ),
                React.createElement(TaskForm, {
                    value: this.props.newTask,
                    onChange: this.props.onNewTaskChange,
                    onSubmit: this.props.onNewTaskSubmit,
                })
            )
        )
    },
});
