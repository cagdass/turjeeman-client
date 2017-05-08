import React, { PropTypes } from "react";

import TextView from "./text_view/text_view";

import "./_assets/style.css"

import appState from "../../../utility/app_state";

const colors = ["darkRed", "red", "green", "blue", "#336699", "orange", "brown", "purple", "pink", "#996633", "lightGreen", "#008844"];

class Project extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "id": "",
            "sentences": [],
            "projectTitle": "",
            "inputText": "",
            "outputText": "",
            "sourceLanguage": "",
            "targetLanguage": "",
            "tokens": [],
            "mappings": [],
            "currentInputSelections": [],
            "currentOutputSelections": [],
            "activeColor": 0,
            "activeColorLiteral": "",
        };
    }

    componentDidMount () {
        let id = this.props.params.id.trim();

        let edit = appState.getEdit(id);
        let sentencer = appState.getSentencer(id);
        let tokenizer = appState.getTokenizer(id);
        let mapper = appState.getMapper(id);

        if (edit !== {}) {
            this.setState({
                id: id,
                projectTitle: edit.projectTitle,
                inputText: edit.inputText,
                outputText: edit.outputText,
                sourceLanguage: edit.sourceLanguage,
                targetLanguage: edit.targetLanguage,
            });
        }

        let sentences = [];

        if (sentencer !== {}) {
            sentences = sentencer.sentences;
            this.setState({
                "id": id,
                "sentences": sentencer.sentences,
            });
        }

        let tokens = [];
        for (let i = 0; i < sentences.length; i++) {
            tokens.push([]);
        }

        this.setState({
            id: id,
            tokens: tokens
        });

        if (tokenizer !== {}) {
            if (tokenizer.tokens.length >= sentences.length && tokenizer.tokens !== []) {
                if (mapper !== {}) {
                    this.setState({
                        mappings: mapper.mappings,
                        id: id,
                        tokens: tokenizer.tokens,
                    });
                }
                else{
                    this.setState({
                        id: id,
                        tokens: tokenizer.tokens,
                    });
                }
            }
        }
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

    handleTokenChange (index, selectedMappings) {
        let { mappings } = this.state;

        mappings[index] = selectedMappings;

        this.setState({mappings});
    }

    renderSentencePair (sentencePair, index) {
        let source = sentencePair[0] || "";
        let target = sentencePair[1] || "";

        let { tokens = [], activeColorLiteral, activeColor } = this.state;

        let tokens_ = [];
        if (tokens.length > index) {
            tokens_ = tokens[index];
        }

        return (<div className="center-wv">
            <TextView
                input={source}
                output={target}
                ref={"tokenize_" + index}
                onChange={this.handleTokenChange.bind(this)}
                index={index}
                tokens={tokens_}
                activeColor={activeColor}
            />
        </div>)
    }

    changeColor (index) {
        this.setState({
            activeColor: index,
            activeColorLiteral: colors[index]
        });
    }

    renderColorPicks (index) {
        let { activeColor } = this.state;

        let color = colors[index];

        if (activeColor !== index) {
            return (
                <div onClick={this.changeColor.bind(this, index)} className="color-el" style={{backgroundColor: color}}></div>
            )
        }
        else {
            return (
                <div style={{backgroundColor: color}}>
                    <div style={{backgroundColor: "white"}} className="color-el-white">
                        <div onClick={this.changeColor.bind(this, index)} className="color-el" style={{backgroundColor: color}}></div>
                    </div>
                </div>
            )
        }
    }

    previousStage () {
        let { id, mappings } = this.state;

        let { router } = this.context;

        appState.setMapper(id, mappings);

        router.push("/tokenizer/" + id);
    }

    saveProject () {
        // Don't know any user_ids.
        let { projectTitle, id, user_id = "12345", sourceLanguage, targetLanguage, sentences, tokens, mappings } = this.state;

        // The request object.
        let request = {
            "user_id": user_id,
            "project_id": id,
            "title": projectTitle,
            "timestamp": (Math.floor(Date.now() / 1000)),
            "source_language": sourceLanguage,
            "target_language": targetLanguage,
            "sentence_pairs": sentences,
            "tokens": tokens,
            "mappings": mappings,
        }

        // @TODO send request with the "request" object. Send objects in "edit.js", "tokenizer.js", "sentencer.js"
    }

    autoMapper () {
        let { sentences, tokens } = this.state;

        fetch('mapper', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sentence_pairs: sentences,
                tokens: tokens,
            })
        }).then(response => {
            let obj = response.json();
            // Access fields in the response object.

            let mappings = obj.mappings;
            this.setState({
                "mappings": mappings
            })

        }).catch(error => console.error(error));
    }


    render () {
        let { inputText = "", outputText = "", sentences = [], mappings, activeColor, projectTitle } = this.state;

        let nums = [0,1,2,3,4,5,6,7,8,9,10,11];

        return (
            <div className="center-wh">
                <div className="center-wv" style={{paddingTop: 50, marginRight: 120}}>
                    <button
                        onClick={this.previousStage.bind(this)}
                        type="button"
                        className="pt-button pt-intent-warning"
                        style={{margin: 20}}>
                        <span className="pt-icon-standard pt-icon-arrow-left pt-align-left" />
                        Tokenizer
                    </button>
                    <button
                        onClick={this.autoMapper.bind(this)}
                        type="button"
                        className="pt-button pt-intent-save "
                        style={{margin: 20}}>
                        Auto mapper
                    </button>
                    <button
                        onClick={this.saveProject.bind(this)}
                        type="button"
                        className="pt-button pt-intent-save"
                        style={{margin: 20}}>
                        Save project
                        <span className="pt-icon-standard pt-align-right" />
                    </button>
                </div>
                <h1>{projectTitle}</h1>
                <div className="colors-shit center-wv">
                    {nums.map(this.renderColorPicks.bind(this))}
                </div>
                {/*{mappings.map(this.renderMappingPair.bind(this))}*/}
                <div className="translate-div">
                    <div className="center-wh">
                        {sentences.map(this.renderSentencePair.bind(this))}
                    </div>
                </div>
                <div className="center-wv" style={{paddingBottom: 100, marginRight: 120}}>
                    <button
                        onClick={this.previousStage.bind(this)}
                        type="button"
                        className="pt-button pt-intent-warning"
                        style={{margin: 20}}>
                        <span className="pt-icon-standard pt-icon-arrow-left pt-align-left" />
                        Tokenizer
                    </button>
                    <button
                        onClick={this.autoMapper.bind(this)}
                        type="button"
                        className="pt-button pt-intent-save "
                        style={{margin: 20}}>
                        Auto mapper
                    </button>
                    <button
                        onClick={this.saveProject.bind(this)}
                        type="button"
                        className="pt-button pt-intent-save"
                        style={{margin: 20}}>
                        Save project
                        <span className="pt-icon-standard pt-align-right" />
                    </button>
                </div>
            </div>
        );
    }
}

Project.contextTypes = {
    router: PropTypes.object
};

export default Project;
