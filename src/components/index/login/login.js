import React, {PropTypes} from "react";

import PasswordInput from "./password_input/password_input";
import UsernameInput from "./username_input/username_input";

import loginService from "./_services/login_service";
import "./_assets/style.css";

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
                <div className="username-form">
                    <UsernameInput />
                </div>
                <div className="password-form">
                    <PasswordInput />
                </div>
            </div>
        );
    }
}

Login.contextTypes = {
    router: PropTypes.object
};

export default Login;
