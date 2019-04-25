var Header = React.createClass({
    routeChange: function(){
        alert('Going to ' +this);
        let path = `newPath`;
        this.props.history.push(path);
    },
    render: function() {
        return (
            <div id="header">
                <nav className="navbar navbar-dark bg-dark fixed-top">
                    <a className="header-logo" href="/">
                        <span onClick={this.routeChange} className="navbar-brand mb-0 h1 header-logo-loading">Workspace</span>
                    </a>
                    <div className="btn-group" role="group">
                        <a onClick={this.routeChange} className="btn btn-outline-info">Dashboard</a>
                        <a onClick={this.routeChange} className="btn btn-outline-success goal-btn">Goals</a>
                    </div>
                </nav>
            </div>
        )
    }
});
