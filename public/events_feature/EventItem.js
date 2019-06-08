

var EventItem = React.createClass({
    propTypes: {
        description: React.PropTypes.string,
    },



    removeEvent(name, i){
        let event = this.state.task.slice();
        event.splice(i, 1);
        this.setState({
            event
        });
    },

    render: function() {
        return (
            React.createElement('div', {className: 'EventItem'},
                React.createElement('div', {className: 'EventItem-description'}, this.props.description),
                React.createElement('button', {type: 'submit', className: "button btn btn-light btn-sm"}, "Remove",)
            )
        )
    },
});

