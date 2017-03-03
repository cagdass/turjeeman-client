import React from "react";

class Home extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
    }

    render () {
        let {children} = this.props;

        return (
            <div>
                Home!
                {children}
            </div>
        );
    }
}

export default Home;
