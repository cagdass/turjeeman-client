import React, { PropTypes } from "react";

import appState from "../../../utility/app_state";
import "./_assets/style.css";

class MyAccount extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {

        };
    }

    componentWillMount () {
        // Get user data.
        let user = appState.getUser();
        let {name, surname} = user || {name: "",  surname: ""};

        this.setState({
            name, surname
        })
    }

    render () {
        let { name, surname } = this.state;

        return (
            <div className="center-wh">
                <h3>{name + " " + surname}</h3>
            </div>
        );
    }
}

MyAccount.contextTypes = {
    router: PropTypes.object
};

export default MyAccount;
