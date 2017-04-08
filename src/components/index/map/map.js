import React, { PropTypes } from "react";

import TextView from "./text_view/text_view";

import "./_assets/style.css"

class Project extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "inputText": "",
            "outputText": "",
            "mappings": [],
            "currentInputSelections": [],
            "currentOutputSelections": [],
        };
    }

    componentDidMount () {
        // @TODO: Replace this with a backend function that'll retrieve the input/output text.
        this.setState({
            inputText: "Baraa Orabi diye yazilir adam diye okunur",
            outputText: "Written Baraa Orabi but better read MAN"
        })
    }

    handleInputLanguageChange (text, currentSelections) {
        this.setState({
            "inputText": text,
            "currentInputSelections": currentSelections,
        })
    }

    handleOutputLanguageChange (text, currentSelections) {
        this.setState({
            "outputText": text,
            "currentOutputSelections": currentSelections,
        })
    }

    saveMapping () {
        let { currentInputSelections, currentOutputSelections, mappings } = this.state;

        this.setState({
            "mappings": [...mappings, [currentInputSelections, currentOutputSelections]],
            "currentInputSelections": [],
            "currentOutputSelections": []
        });

        this.refs.inputTextArea.clearSelections();
        this.refs.outputTextArea.clearSelections();
    }

    renderInputSelections (selection) {
        console.log(selection);
        let { inputText } = this.state;

        return (<span>
            {inputText.substring(selection[0], selection[1])}
        </span>);
    }

    renderOutputSelections (selection) {
        let { outputText } = this.state;

        return (<span>
            {outputText.substring(selection[0], selection[1])}
        </span>);
    }

    renderMapping (pair, index) {
        if (index % 2 == 0) {
            return (<span>
                {pair.map(this.renderInputSelections.bind(this))}
            </span>);

        }
        else {
            return (<span>
                {pair.map(this.renderOutputSelections.bind(this))}
            </span>);
        }
    }

    renderMappingPair (mapping, index) {
        return (<div>
            {mapping.map(this.renderMapping.bind(this))}
        </div>)
    }

    render () {
        let { inputText, outputText, mappings } = this.state;

        return (
            <div className="center-wh">
                <h1>Project</h1>
                <pre>
                    {`Input text: ${inputText}\nOutput text: ${outputText}\n`}
                </pre>
                {mappings.map(this.renderMappingPair.bind(this))}
                <div className="translate-div">
                    <div className="text-area">
                        <TextView
                            input={inputText}
                            ref="inputTextArea"
                            onChange={this.handleInputLanguageChange.bind(this)}
                        />
                    </div>
                    <div className="text-area">
                        <TextView
                            input={outputText}
                            ref="outputTextArea"
                            onChange={this.handleOutputLanguageChange.bind(this)}
                        />
                    </div>
                    <div>
                        <button onClick={this.saveMapping.bind(this)} type="button" className="pt-button pt-intent-success" style={{width: 80, marginTop: -400}}>
                            Save mapping
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
