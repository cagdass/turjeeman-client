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
            emailMessage: "hidden",
            passwordFocus: false,
            passwordFocus2: false,
            passwordMatch: true,
            passwordMessage: "hidden",
            firstName: "",
            lastName: "",
        };
    }

    handleChange (fieldName, event) {
        let value = event.target.value;

        let { emailFocus } = this.state;

        if (fieldName === "email") {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            let result = re.test(value);

            console.log(result);

            this.setState({
                "emailRegex": result,
                "emailDirty": true,
                "emailMessage": (!emailFocus && !result) ? "visible" : "hidden",
            });
        }
        else {
            let { password, passwordRe, passwordFocus, passwordFocus2 } = this.state;
            let notMatch = false;

            if (fieldName === "password") {
                notMatch = value === passwordRe && (passwordRe !== "");
                this.setState({
                    passwordMatch: notMatch,
                });
            }
            else if (fieldName === "passwordRe") {
                notMatch = value === password && (password !== "");
                this.setState({
                    passwordMatch: notMatch,
                })
            }

            this.setState({
                passwordMessage: (notMatch && !passwordFocus && !passwordFocus2) ? "visible" : "hidden",
            })
        }

        this.setState({
            [fieldName]: value,
        });
    }

    handleClick () {
        let { passwordMessage, emailMessage, email, password, firstName, lastName } = this.state;

        if (passwordMessage === "hidden" && emailMessage === "hidden") {
            // Send request.
            let { router } = this.context;
            let { email, password, firstName, lastName } = this.state;

            let request = {
                "email": email,
                "password": password,
                "firstName": firstName,
                "lastName": lastName,
            };

            fetch('auth/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    password: password,
                    name: firstName + lastName,
                })
            })
            .then((resp) => resp.json()) // Transform the data into json
            .then(data => {
                console.log(data);
                router.push("/login");
            })
            .catch(error => console.log(error));
        }
    }

    emailFocus () {
        this.setState({
            "emailMessage": "hidden",
            emailFocus: true,
        });
    }

    emailBlur () {
        let { emailRegex } = this.state;

        this.setState({
            emailMessage: (!emailRegex) ? "visible" : "hidden",
            emailFocus: false,
        });
    }

    passwordFocus () {
        this.setState({
            passwordFocus: true,
        });
    }

    passwordFocus2 () {
        this.setState({
            passwordFocus2: true,
        });
    }

    passwordBlur () {
        let { password, passwordRe, passwordMatch, passwordFocus2 } = this.state;

        this.setState({
           passwordFocus: false
        });

        this.setState({
            passwordMessage: (password !== "" && passwordRe !== "" && !passwordMatch && !passwordFocus2) ? "visible" : "hidden",
        })
    }

    passwordBlur2 () {
        let { password, passwordRe, passwordMatch, passwordFocus } = this.state;

        this.setState({
            passwordFocus2: false,
        });

        this.setState({
            passwordMessage: (password !== "" && passwordRe !== "" && !passwordMatch && !passwordFocus) ? "visible" : "hidden",
        })
    }

    render () {
        let { email, password, passwordRe, emailDirty, emailFocus, emailRegex, emailMessage, passwordMessage, passwordFocus, passwordFocus2, passwordMatch } = this.state;

        return (
            <div className="center-wh" style={{paddingTop: 300}}>
                {/*<pre>{`emailFocus: ${emailFocus}\nemailRegex: ${emailRegex}\nemailMessage ${emailMessage}\npasswordMessage: ${passwordMessage}\npf ${passwordFocus}\npf2 ${passwordFocus2}\npm ${passwordMatch}`}</pre>*/}
                <input
                    onChange={this.handleChange.bind(this, "email")}
                    type="email"
                    placeholder="Email"
                    className={"pt-input " + ((!emailFocus && !emailRegex && emailDirty) ? 'pt-intent-danger' : '')}
                    onFocus={this.emailFocus.bind(this)}
                    onBlur={this.emailBlur.bind(this)}
                />
                <br />
                {(emailMessage !== "hidden") && <div>
                    <p style={{fontSize: 14, color: "red", visibility: emailMessage}}>Invalid email!</p>
                <br /></div>}
                <input
                    onChange={this.handleChange.bind(this, "password")}
                    type="password"
                    placeholder="Password"
                    className="pt-input"
                    onFocus={this.passwordFocus.bind(this)}
                    onBlur={this.passwordBlur.bind(this)}
                />
                <br />
                <input
                    onChange={this.handleChange.bind(this, "passwordRe")}
                    type="password"
                    placeholder="Password"
                    className="pt-input"
                    onFocus={this.passwordFocus2.bind(this)}
                    onBlur={this.passwordBlur2.bind(this)}

                />
                <br />
                {(passwordMessage !== "hidden") && <div>
                    <p style={{fontSize: 14, color: "red", visibility: passwordMessage}}>Passwords do not match</p>
                    <br /></div>}
                <input
                    onChange={this.handleChange.bind(this, "firstName")}
                    placeholder="First Name"
                    className="pt-input"
                />
                <br />
                <input
                    onChange={this.handleChange.bind(this, "lastName")}
                    placeholder="Last Name"
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
