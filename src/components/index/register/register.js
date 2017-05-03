import React, { PropTypes } from "react";

import "./_assets/style.css";

class Register extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            email: "",
            password: "",
            passwordRe: ""
        };
    }

    handleChange (fieldName, event) {
        let value = event.target.value;

        this.setState({
            [fieldName]: value,
        });
    }

    handleClick () {

    }

    render () {
        let { email, password, passwordRe } = this.state;

        return (
            <div className="center-wh">
                <pre>{`email: ${email}\npassword: ${password}\npasswordRe: ${passwordRe}`}</pre>
                <input
                    onChange={this.handleChange.bind(this, "email")}
                    type="email"
                    placeholder="Email"
                    className="pt-input"
                />
                <br />
                <input
                    onChange={this.handleChange.bind(this, "password")}
                    type="password"
                    placeholder="Password"
                    className="pt-input"
                />
                <br />
                <input
                    onChange={this.handleChange.bind(this, "passwordRe")}
                    type="password"
                    placeholder="Password"
                    className="pt-input"
                />
                <br />
                <div>
                    <div>
                        <a onClick={this.handleClick.bind(this)} role="button" className="pt-button pt-intent-primary" tabIndex={0}>Register</a>
                    </div>
                </div>

            </div>
        );
    }
}

Register.contextTypes = {
    router: PropTypes.object
};

export default Register;
