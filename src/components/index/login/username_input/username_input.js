import React, {PropTypes} from "react";

class UsernameInput extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "isDirty": false,
            "error": false,
            "formSubmitted": false,
            "username" : ""
        };
    }

    handleChange(e) {
        let value = e.target.value;
        this.setState({
            "username": value
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
        let { username } = this.state;
        let { showError } = this.props;

        return (
            <div>
                <div className="pt-input-group">
                    <input
                        onFocus={this.handleFocus.bind(this)}
                        onChange={this.handleChange.bind(this)}
                        onKeyPress={this.keyPress.bind(this)}
                        type="username"
                        className={"pt-input " + (showError ? 'pt-intent-danger' : '')}
                        placeholder="Email"
                    />
                </div>
            </div>
        );
    }
}

UsernameInput.contextTypes = {
    router: PropTypes.object
};

export default UsernameInput;
