import React, { PropTypes } from "react";

import "./_assets/style.css"

class Edit extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "inputText": "",
            "outputText": "",
        };
    }



    render () {
        let { inputText, outputText, mappings } = this.state;

        return (
            <div>
                Hellozzles
            </div>
        );
    }
}

Edit.contextTypes = {
    router: PropTypes.object
};

export default Edit;
