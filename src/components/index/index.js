import React from "react";

import NavBar from "./navbar/navbar.js";

class Index extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
    }

    render() {
        let {children} = this.props;

        return (
            <div>
                <NavBar/>
                {children}
            </div>
        );
    }
}

export default Index;
