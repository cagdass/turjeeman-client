import React from "react";

class Index extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
    }

    render() {
        let {children} = this.props;

        return (
            <div>
                Turjee man!
                {children}
            </div>
        );
    }
}

export default Index;
