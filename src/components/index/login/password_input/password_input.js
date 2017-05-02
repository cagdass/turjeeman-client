import React, {PropTypes} from "react";

import "./_assets/style.css"

class PasswordInput extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "isDirty": false,
            "error": false,
            "formSubmitted": false,
            "password" : ""
        };
    }

    handleChange(e) {
        let value = e.target.value;
        this.setState({
            "password": value
        });

        this.props.onChange(value);
    }

    handleFocus () {
        this.props.onFocus();
    }

    keyPress (e) {
        if (e.key == 'Enter') {
            this.props.handleEnter();
        }
    }

    render () {
        let { password } = this.state;
        let { showError } = this.props;

        console.log(showError);

        return (
            <div className="pt-input-group">
                <input
                    onChange={this.handleChange.bind(this)}
                    onFocus={this.handleFocus.bind(this)}
                    onKeyPress={this.keyPress.bind(this)}
                    type="password"
                    className={"pt-input " + (showError ? 'pt-intent-danger' : '')}
                    placeholder="Password"
                />
                <button className="pt-button pt-minimal pt-intent-warning pt-icon-lock" tabIndex="-1"></button>
            </div>
        );
    }
}

PasswordInput.contextTypes = {
    router: PropTypes.object
};

export default PasswordInput;
