import React, { PropTypes } from "react";

import "./_assets/style.css";

class Register extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            email: "",
            password: "",
            passwordRe: "",
            emailDirty: false,
            emailFocus: false,
            emailRegex: true,
        };
    }

    handleChange (fieldName, event) {
        let value = event.target.value;

        if (fieldName === "email") {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            let result = re.test(value);

            console.log(result);

            this.setState({
                "emailRegex": result,
            });
        }

        this.setState({
            [fieldName]: value,
        });
    }

    handleClick () {

    }

    emailFocus () {
        this.setState({
            emailFocus: true,
        });
    }

    emailBlur () {
        this.setState({
            emailFocus: false,
        });
    }

    render () {
        let { email, password, passwordRe, emailFocus, emailRegex } = this.state;

        return (
            <div className="center-wh" style={{paddingTop: 300}}>
                <pre>{`emailFocus: ${emailFocus}\nemailRegex: ${emailRegex}`}</pre>
                <input
                    onChange={this.handleChange.bind(this, "email")}
                    type="email"
                    placeholder="Email"
                    className="pt-input"
                    onFocus={this.emailFocus.bind(this)}
                    onBlur={this.emailBlur.bind(this)}
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
