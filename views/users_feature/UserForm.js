var UserForm = React.createClass({
    propTypes: {
        value: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        //onPageCollapse: React.PropTypes.func.isRequired, // Submitting a new user should be when new page load
    },

    onNewPageLoad: function(e) {
        this.props.onChange(Object.assign({}, this.props.value, {userId: e.target.value}))
    },

    onPageCollapse: function(e) {
        e.preventDefault();
        this.props.onPageCollapse()
    },

    render: function() {
        var errors = this.props.value.errors || {};

        return ( // change so that stuff gets rendered, when newpageload
            React.createElement('form', {onChange: this.onChange, className: 'UserForm', noValidate: true},
                React.createElement('div', {
                    placeholder: 'User',
                    onLoad: this.onNewPageLoad, //changed from onInput
                    value: this.props.value.userId,
                    ref: 'user',
                }),
            )
        )
    },
});