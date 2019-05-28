var TasksView = React.createClass({
    propTypes: {
        tasks: React.PropTypes.array.isRequired,
        newTask: React.PropTypes.object.isRequired,
        onNewTaskChange: React.PropTypes.func.isRequired,
        onNewTaskSubmit: React.PropTypes.func.isRequired,
    },

    removeItem(item, i) {
        this.props.removeTask(item, i);
    },


    render: function() {
        return (
            React.createElement('div', {className: 'TasksView'},
                React.createElement('h1', {className: 'TasksView-title'}, "Tasks"),
                React.createElement('ul', {className: 'TasksView-list'},
                    this.props.tasks.map(function(task) {
                        return React.createElement(TaskItem, task)
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
