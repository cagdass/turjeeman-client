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

    componentDidMount () {
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

    handleChange (fieldName, value) {
        let text = value

        this.setState({
            [fieldName]: text,
        });
    }

    nextStage () {
        let { id, inputText, outputText, projectTitle, sourceLanguage, targetLanguage } = this.state;
        let { router } = this.context;

        appState.setEdit(id, inputText, outputText, sourceLanguage, targetLanguage, projectTitle);

        // @TODO send source&target texts to the sentencer.

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

    saveProject () {
        // Don't know any user_ids.
        let { projectTitle, id, user_id = "12345", sourceLanguage, targetLanguage } = this.state;

        // The request object.
        let request = {
            "user_id": user_id,
            "project_id": id,
            "title": projectTitle,
            "timestamp": (Math.floor(Date.now() / 1000)),
            "source_language": sourceLanguage,
            "target_language": targetLanguage,
        }
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
                    <div style={{marginLeft: 50, marginRight: 50, padding: 100}}>
                        <EditableText
                            className="limit-width"
                            multiline minLines={3} maxLines={12}
                            placeholder="Enter source text"
                            selectAllOnFocus={this.state.selectAllOnFocus}
                            value={inputText}
                            onChange={this.handleChange.bind(this, "inputText")}
                        />
                    </div>
                    <div style={{marginLeft: 50, marginRight: 50, padding: 100}}>
                        <EditableText
                            className="limit-width"
                            multiline minLines={3} maxLines={12}
                            placeholder="Enter target text"
                            selectAllOnFocus={this.state.selectAllOnFocus}
                            value={outputText}
                            onChange={this.handleChange.bind(this, "outputText")}
                        />
                    </div>
                </div>
                <div style={{paddingBottom: 100, marginLeft: 100}}>
                    <button
                        onClick={this.saveProject.bind(this)}
                        type="button"
                        className="pt-button pt-intent-save"
                        style={{margin: 20}}>
                        Save project
                    </button>
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
