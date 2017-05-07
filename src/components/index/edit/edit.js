import React, { PropTypes } from "react";

import { Classes, EditableText, Intent, Switch } from "@blueprintjs/core";

import appState from "../../../utility/app_state";

import "./_assets/style.css"
import "../../../assets/css/style.css";

class Edit extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "inputText": "",
            "outputText": "",
            "id": "",
            "projectTitle": "",
            "sourceLanguage": "",
            "targetLanguage": "",
        };
    }

    componentWillMount() {
        let id = this.props.params.id.trim();

        let project = appState.getEdit(id);
        console.log(project);

        if (project !== {}) {
            this.setState({
                id: id,
                projectTitle: project.projectTitle,
                inputText: project.inputText,
                outputText: project.outputText,
                sourceLanguage: project.sourceLanguage,
                targetLanguage: project.targetLanguage,
            });
        }
        else {
            this.setState({
                id: id,
                projectTitle: "",
                inputText: "",
                outputText: "",
                sourceLanguage: "",
                targetLanguage: "",
            });
        }
    }

    handleChange (fieldName, event) {
        let text = event.target.value;

        this.setState({
            [fieldName]: text,
        });
    }

    nextStage () {
        let { id, inputText, outputText, projectTitle, sourceLanguage, targetLanguage } = this.state;
        let { router } = this.context;

        appState.setEdit(id, inputText, outputText, sourceLanguage, targetLanguage, projectTitle);

        router.push("/sentencer/ " + id);
    }

    updateLanguage (fieldName, event) {
        let { sourceLanguage, targetLanguage } = this.state;

        let language = event.target.value;

        if (language === "Choose source language" || language === "Choose target language") {
            this.setState({
                [fieldName]: "",
            })
        }
        else if ((fieldName === "sourceLanguage" && language !== targetLanguage) || (fieldName === "targetLanguage" && language !== sourceLanguage)) {
            this.setState({
                [fieldName]: language,
            });
        }
    }

    handleTitleChange (value) {
        this.setState({
            "projectTitle": value
        })
    }

    render () {
        let { inputText, outputText, sourceLanguage, targetLanguage, projectTitle, id } = this.state;

        return (
            <div className="center-wh">
                <div style={{paddingTop: 100}}>
                    <h1>
                        <EditableText
                            placeholder="Edit title..."
                            selectAllOnFocus={this.state.selectAllOnFocus}
                            value={this.state.projectTitle}
                            onChange={this.handleTitleChange.bind(this)}
                        />
                    </h1>
                </div>
                {/*<pre>{`Project Title: ${projectTitle}\nInput text: ${inputText}\nOutput text: ${outputText}\nSource language: ${sourceLanguage}\nTarget language: ${targetLanguage}`}</pre>*/}
                <div className="center-wv">
                    <div>
                        <div className="pt-select" style={{margin: 20}}>
                            <select onChange={this.updateLanguage.bind(this, "sourceLanguage")}>
                                {sourceLanguage === "" ? <option defaultValue>Choose source language</option> : <option defaultValue>{sourceLanguage}</option>}
                                {sourceLanguage !== "English" && <option value="English">English</option>}
                                {sourceLanguage !== "Turkish" && <option value="Turkish">Turkish</option>}
                            </select>
                        </div>
                        <div className="pt-select" style={{margin: 20}}>
                            <select onChange={this.updateLanguage.bind(this, "targetLanguage")}>
                                {targetLanguage === "" ? <option defaultValue>Choose target language</option> : <option defaultValue>{targetLanguage}</option>}
                                {targetLanguage !== "English" && <option value="English">English</option>}
                                {targetLanguage !== "Turkish" && <option value="Turkish">Turkish</option>}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="center-wv">
                    <div className="encapsulator">
                        <textarea
                            className="text-field pt-input pt-large "
                            dir="auto"
                            onChange={this.handleChange.bind(this, "inputText")}
                        >{inputText}</textarea>
                    </div>
                    <div className="encapsulator">
                        <textarea
                            className="pt-input pt-large text-field"
                            dir="auto"
                            onChange={this.handleChange.bind(this, "outputText")}
                        >{outputText}</textarea>
                    </div>
                </div>
                <div style={{paddingBottom: 100}}>
                    <button onClick={this.nextStage.bind(this)} type="button" className="pt-button pt-intent-success">
                        Sentencer
                        <span className="pt-icon-standard pt-icon-arrow-right pt-align-right"></span>
                    </button>
                </div>
            </div>
        );
    }
}

Edit.contextTypes = {
    router: PropTypes.object
};

export default Edit;
