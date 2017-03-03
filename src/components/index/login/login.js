import React, {PropTypes} from "react";
import loginService from "./_services/login_service";

class Login extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "error": "",
            "formSubmitted": "",
            "username": "",
            "password" : ""
        };
    }

    render () {
        let { error, formSubmitted, username, password } = this.state;

        return (
            <div className="login-page">
                Login stuff
            </div>
        );
    }
}

Login.contextTypes = {
    router: PropTypes.object
};

export default Login;
