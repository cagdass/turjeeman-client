import React, {PropTypes} from "react";

class LoginButton extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "clicked": false
        };
    }

    handleClick () {
        this.setState({
            "clicked": true
        });
        this.props.clickFunction();
    }

    render () {
        return (
            <div>
                <a onClick={this.handleClick.bind(this)} role="button" className="pt-button pt-intent-primary" tabIndex={0}>Log in</a>
            </div>
        );
    }
}

LoginButton.contextTypes = {
    router: PropTypes.object
};

export default LoginButton;
