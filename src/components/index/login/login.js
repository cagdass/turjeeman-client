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
            "error": undefined,
            "formSubmitted": false,
            "username": "",
            "password" : "",
            "isDirty": false,
        };
    }

    onLogin(username, password, e) {
        // e.preventDefault();
        loginService.loginUser({username, password})
            .then(() => {
                let {location} = this.props;
                let {router} = this.context;
                if (location.state && location.state.nextPathname) {
                    router.replace({pathname: '/dashboard', query: location.state.nextQuery})
                } else {
                    router.replace('/dashboard');
                }
                this.setState({
                    error: undefined,
                    formSubmitted: true,
                    isDirty: false
                });
            })
            .catch(error => this.setState({
                error,
                formSubmitted: true,
                isDirty: false
            }))
    }

    passwordChange (password) {
        this.setState({
            "password": password,
            "isDirty": true
        })
    }

    usernameChange (username) {
        this.setState({
            "username": username,
            "isDirty": true
        })
    }

    onButtonClick () {
        this.setState({
            "formSubmitted": true
        });
    }

    setDirty () {
        this.setState({
            "isDirty": true,
        })
    }

    render () {
        let { error, formSubmitted, username, password, isDirty } = this.state;

        return (
            <div className="login-page">
                <hr />
                <div className="username-form">
                    <UsernameInput
                        onFocus={this.setDirty.bind(this)}
                        onChange={this.usernameChange.bind(this)}
                        handleEnter={this.onLogin.bind(this, username, password)}
                        showError={(error != undefined) && !isDirty}
                    />
                </div>
                <div className="password-form">
                    <PasswordInput
                        onFocus={this.setDirty.bind(this)}
                        onChange={this.passwordChange.bind(this)}
                        handleEnter={this.onLogin.bind(this, username, password)}
                        showError={(error != undefined) && !isDirty}
                    />
                </div>
                <br />
                <div>
                    <LoginButton clickFunction={this.onLogin.bind(this, username, password)} />
                </div>
                <br />
                <Link to="forgot_password">Forgot password</Link>
                <br />
                <Link to="register">Register</Link>
            </div>
        );
    }
}

Login.contextTypes = {
    router: PropTypes.object
};

export default Login;
