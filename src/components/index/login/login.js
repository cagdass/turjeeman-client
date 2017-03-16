import React, { PropTypes } from "react";
import { Link } from "react-router";

import PasswordInput from "./password_input/password_input";
import UsernameInput from "./username_input/username_input";
import LoginButton from "./login_button/login_button";

import loginService from "./_services/login_service";
import "./_assets/style.css";

class Login extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "error": "",
            "formSubmitted": false,
            "username": "",
            "password" : ""
        };
    }

    passwordChange (password) {
        this.setState({
            "password": password
        })
    }

    usernameChange (username) {
        this.setState({
            "username": username
        })
    }

    onButtonClick () {
        this.setState({
            "formSubmitted": true
        });
    }

    render () {
        let { error, formSubmitted, username, password } = this.state;

        return (
            <div className="login-page">
                Login stuff
                <hr />
                <b>For debug:</b>
                <pre>{`username: ${username}\npassword: ${password}\nformSubmitted: ${formSubmitted}`}</pre>
                <div className="username-form">
                    <UsernameInput onChange={this.usernameChange.bind(this)} />
                </div>
                <div className="password-form">
                    <PasswordInput onChange={this.passwordChange.bind(this)} />
                </div>
                <div>
                    <LoginButton clickFunction={this.onButtonClick.bind(this)} />
                </div>
                <Link to="forgot_password">Forgot password</Link>
            </div>
        );
    }
}

Login.contextTypes = {
    router: PropTypes.object
};

export default Login;
