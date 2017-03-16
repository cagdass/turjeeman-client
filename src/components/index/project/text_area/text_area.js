import React, {PropTypes} from "react";

import "./_assets/style.css";

class TextArea extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
        };
    }

    render () {
        return (
            <div>
                <textarea className="pt-input pt-fill" dir="auto"></textarea>
            </div>
        );
    }
}

TextArea.contextTypes = {
    router: PropTypes.object
};

export default TextArea;


