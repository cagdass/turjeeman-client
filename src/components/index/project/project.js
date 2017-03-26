import React, { PropTypes } from "react";

import TextArea from "./text_area/text_area";

import "./_assets/style.css"

class Project extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
        };
    }

    render () {
        return (
            <div className="center-wh">
                <h1>Project</h1>
                <div className="translate-div">
                    <div className="text-area">
                        <TextArea/>
                    </div>
                    <div className="text-area">
                        <TextArea className="text-area"/>
                    </div>
                    <div>
                        <button type="button" className="pt-button pt-intent-success" style={{width: 80}}>
                            Save <span className="pt-icon-standard pt-icon-arrow-right pt-align-right"></span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Project.contextTypes = {
    router: PropTypes.object
};

export default Project;
