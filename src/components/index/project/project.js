import React, { PropTypes } from "react";

import TextArea from "./text_area/text_area";

import "./_assets/style.css"

class Project extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "inputText": "",
            "outputText": "",
            "inputSelections": [],
            "outputSelections": [],
            "currentInputSelections": [],
            "currentOutputSelections": [],
        };
    }

    handleInputLanguageChange (text, currentSelections) {
        this.setState({
            "inputText": text,
            "inputSelections": currentSelections,
        })
    }

    handleOutputLanguageChange (text, currentSelections) {
        this.setState({
            "outputText": text,
            "outputSelections": currentSelections,
        })
    }

    render () {
        let { inputText, outputText, inputSelections, outputSelections, currentInputSelections, currentOutputSelections } = this.state;

        return (
            <div className="center-wh">
                <h1>Project</h1>
                <pre>
                    {`Input text: ${inputText}\nOutput text: ${outputText}\nInput selections: ${inputSelections}\nOutput selections: ${outputSelections}`}
                </pre>
                <div className="translate-div">
                    <div className="text-area">
                        <TextArea
                            onChange={this.handleInputLanguageChange.bind(this)}
                        />
                    </div>
                    <div className="text-area">
                        <TextArea
                            onChange={this.handleOutputLanguageChange.bind(this)}
                        />
                    </div>
                    <div>
                        <button type="button" className="pt-button pt-intent-success" style={{width: 80, marginTop: -400}}>
                            Save
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
