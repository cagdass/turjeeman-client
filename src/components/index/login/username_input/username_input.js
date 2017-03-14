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

    render () {
        let { username } = this.state;
        return (
            <div>
                <div className="pt-input-group">
                    <input onChange={this.handleChange.bind(this)} type="username" className="pt-input" placeholder="Username" />
                </div>
            </div>
        );
    }
}

UsernameInput.contextTypes = {
    router: PropTypes.object
};

export default UsernameInput;
