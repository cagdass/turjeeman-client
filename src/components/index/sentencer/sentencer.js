import React, { PropTypes } from "react";

import { Classes, EditableText, Intent, Switch } from "@blueprintjs/core";

import appState from "../../../utility/app_state";

import "./_assets/style.css";
import "../../../assets/css/style.css";

class Sentencer extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "sentences": [],
            "id": "",
            "projectTitle": "",
            "inputText": "",
            "outputText": "",
            "sourceLanguage": "",
            "targetLanguage": "",
        };
    }

    componentDidMount () {
        let id = this.props.params.id.trim();
        this.setState({id});

        let edit = appState.getEdit(id);

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

        this.setState({
            sentences: [["Vodafone Arena'da belki de ligin kaderini çizecek Beşiktaş-Fenerbahçe kapışması öncesi Quaresma antrenmanda şık bir gol attı.", "Vodafone Arena, perhaps the league's destiny to draw Besiktas-Fenerbahce before the fighting Quaresma goal was a stylish goal."]
            , ["Kasımpaşa maçının hazırlıklarını sürdüren Galatasaray'da ise Sabri Sarıoğlu yaptığı gol denemesinde başarılı olamadı.", "In preparation for the match Kasimpasa Galatasaray Sabri Sarioglu did not succeed in trying to score goals."]
                , ["Bu görüntüler sosyal medyada 2 oyuncu arasında kıyaslama yapılmasına neden oldu...", "These images caused comparisons between 2 players in the social media..."]
            ],
        })
    }

    // componentDidMount () {
    //     // @TODO: Replace this with a backend function that'll retrieve the input/output text.
    //
    // }

    mergeSentence (index) {
        let { sentences } = this.state;

        if (index !== sentences.length - 1) {
            let s1 = sentences[index][0];
            let t1 = sentences[index][1];
            let s2 = sentences[index+1][0];
            let t2 = sentences[index+1][1];

            let s0 = s1 + " " + s2;
            let t0 = t1 + " " + t2;

            sentences = [...sentences.slice(0, index), [s0, t0], ...sentences.slice(index + 2)];

            this.setState({
                sentences
            });
        }
    }

    addSentence (index) {
        let { sentences } = this.state;

        sentences = [...sentences.slice(0, index), ["", ""], ...sentences.slice(index)];

        this.setState({sentences});
    }

    editSentence (index, index_, value) {
        let { sentences } = this.state;

        sentences[index][index_] = value;

        this.setState({
            sentences
        });
    }

    renderSentencePair (sentencePair, index) {
        return (<div className="center-wv padding-left-10p">
            <div className="padding-20 wh">
                <span
                    className="pt-icon-size pt-icon-add padding-10"
                    onClick={this.addSentence.bind(this, index)}
                />
                <span
                    className="pt-icon-size pt-icon-delete padding-10"
                    onClick={this.mergeSentence.bind(this, index)}
                />
            </div>
            <div className="padding-10 limit-width">
                <EditableText
                    multiline minLines={3} maxLines={12}
                    placeholder="Enter a sentence"
                    selectAllOnFocus={this.state.selectAllOnFocus}
                    value={sentencePair[0]}
                    onChange={this.editSentence.bind(this, index, 0)}
                />
            </div>
            <div className="padding-10 limit-width">
                <EditableText
                    multiline minLines={3} maxLines={12}
                    placeholder="Enter a sentence"
                    selectAllOnFocus={this.state.selectAllOnFocus}
                    value={sentencePair[1]}
                    onChange={this.editSentence.bind(this, index, 1)}
                />
            </div>
        </div>
        );
    }

    previousStage () {
        let { id, sentences } = this.state;

        let { router } = this.context;

        appState.setSentencer(id, sentences);

        router.push("/edit/" + id);
    }

    nextStage () {
        let { id, sentences } = this.state;

        let { router } = this.context;

        appState.setSentencer(id, sentences);

        router.push("/tokenizer/" + id);
    }

    saveProject () {

    }

    render () {
        let { sentences, projectTitle, id } = this.state;

        return (
            <div>
                <div className="center-wv" style={{paddingTop: 100}}>
                    <button
                        onClick={this.previousStage.bind(this)}
                        type="button"
                        className="pt-button pt-intent-warning"
                        style={{margin: 20}}>
                        <span className="pt-icon-standard pt-icon-arrow-left pt-align-left" />
                        Edit
                    </button>
                    <button
                        onClick={this.saveProject.bind(this)}
                        type="button"
                        className="pt-button pt-intent-save"
                        style={{margin: 20}}>
                        Save project
                    </button>
                    <button
                        onClick={this.nextStage.bind(this)}
                        type="button"
                        className="pt-button pt-intent-success"
                        style={{margin: 20}}>
                        Tokenizer
                        <span className="pt-icon-standard pt-icon-arrow-right pt-align-right" />
                    </button>
                </div>
                <div className="center-wh">
                    <h1>{projectTitle}</h1>
                </div>
                {sentences.map(this.renderSentencePair.bind(this))}
                <div className="center-wv" style={{paddingBottom: 100}}>
                    <button
                        onClick={this.previousStage.bind(this)}
                        type="button"
                        className="pt-button pt-intent-warning"
                        style={{margin: 20}}>
                        <span className="pt-icon-standard pt-icon-arrow-left pt-align-left" />
                        Edit
                    </button>
                    <button
                        onClick={this.saveProject.bind(this)}
                        type="button"
                        className="pt-button pt-intent-save "
                        style={{margin: 20}}>
                        Save project
                    </button>
                    <button
                        onClick={this.nextStage.bind(this)}
                        type="button"
                        className="pt-button pt-intent-success"
                        style={{margin: 20}}>
                        Tokenizer
                        <span className="pt-icon-standard pt-icon-arrow-right pt-align-right" />
                    </button>
                </div>

            </div>
        );
    }
}

Sentencer.contextTypes = {
    router: PropTypes.object
};

export default Sentencer;
