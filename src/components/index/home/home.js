import React from "react";

class Home extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
    }

    render () {
        let {children} = this.props;

        return (
            <div>
                <h1>Home</h1>
                {children}
            </div>
        );
    }
}

export default Home;
