var TaskForm = React.createClass({
    propTypes: {
        value: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSubmit: React.PropTypes.func.isRequired,
    },

    onDescriptionInput: function(e) {
        this.props.onChange(Object.assign({}, this.props.value, {description: e.target.value}))
    },

    onSubmit: function(e) {
        e.preventDefault();
        this.props.onSubmit()
    },

    render: function() {
        var errors = this.props.value.errors || {};

        return (
            React.createElement('form', {onSubmit: this.onSubmit, className: 'TaskForm', noValidate: true},
                React.createElement('textarea', {
                    placeholder: 'Description',
                    onInput: this.onDescriptionInput,
                    value: this.props.value.description,
                    ref: 'description',
                }),
                React.createElement('button', {type: 'submit'}, "Add Task")
            )
        )
    },
});