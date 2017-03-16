import React, { PropTypes } from "react";

class Dashboard extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
        };
    }

    render () {
        return (
            <div className="center-wh">
                <h1>Dashboard</h1>
            </div>
        );
    }
}

Dashboard.contextTypes = {
    router: PropTypes.object
};

export default Dashboard;
