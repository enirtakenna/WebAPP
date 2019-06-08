var EventsView = React.createClass({
    propTypes: {
        events: React.PropTypes.array.isRequired,
        newEvent: React.PropTypes.object.isRequired,
        onNewEventChange: React.PropTypes.func.isRequired,
        onNewEventSubmit: React.PropTypes.func.isRequired,
    },

    removeItem(item, i) {
        this.props.removeEvent(item, i);
    },


    render: function() {
        return (
            React.createElement('div', {className: 'EventsView'},
                React.createElement('h1', {className: 'EventsView-title'}, "Events"),
                React.createElement('ul', {className: 'EventsView-list'},
                    this.props.events.map(function(event) {
                        return React.createElement(EventItem, event)
                    })

                ),
                React.createElement(EventForm, {
                    value: this.props.newEvent,
                    onChange: this.props.onNewEventChange,
                    onSubmit: this.props.onNewEventSubmit,
                })
            )
        )
    },
});
