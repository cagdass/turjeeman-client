import React, { PropTypes } from "react";

import TextView from "./text_view/text_view";

import appState from "../../../utility/app_state";

import "./_assets/style.css";
import "../../../assets/css/style.css";

class Tokenizer extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "sentences": [],
            "tokens": [],
            "activeIndex": -1,
            "id": "",
            "projectTitle": "",
            "inputText": "",
            "outputText": "",
            "sourceLanguage": "",
            "targetLanguage": "",
            "change": false,
        };
    }

    componentDidMount () {
        let id = this.props.params.id.trim();

        let edit = appState.getEdit(id);
        let sentencer = appState.getSentencer(id);
        let tokenizer = appState.getTokenizer(id);

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
                this.setState({
                    id: id,
                    tokens: tokenizer.tokens,
                });
            }
        }
    }

    // componentDidMount () {
    //     // @TODO: Replace this with a backend function that'll retrieve the input/output text.
    //     let sentences = [["Vodafone Arena'da belki de ligin kaderini çizecek Beşiktaş-Fenerbahçe kapışması öncesi Quaresma antrenmanda şık bir gol attı.", "Vodafone Arena, perhaps the league's destiny to draw Besiktas-Fenerbahce before the fighting Quaresma goal was a stylish goal."]
    //         , ["Kasımpaşa maçının hazırlıklarını sürdüren Galatasaray'da ise Sabri Sarıoğlu yaptığı gol denemesinde başarılı olamadı.", "In preparation for the match Kasimpasa Galatasaray Sabri Sarioglu did not succeed in trying to score goals."]
    //         , ["Bu görüntüler sosyal medyada 2 oyuncu arasında kıyaslama yapılmasına neden oldu...", "These images caused comparisons between 2 players in the social media..."]
    //     ];
    //
    //     let { tokens } = this.state;
    //     console.log(tokens);
    //
    //     if (tokens === [] || tokens === undefined) {
    //         tokens = [];
    //         for (let i = 0; i < sentences.length; i++) {
    //             tokens.push([]);
    //         }
    //     }
    //
    //     this.setState({
    //         sentences: sentences,
    //         tokens: tokens,
    //     });
    // }

    previousStage () {
        let { id, sentences, tokens, change } = this.state;

        let { router } = this.context;

        appState.setTokenizer(id, sentences, tokens);

        if (change) {
            let mappings = [];
            appState.setMapper(id, mappings);
        }

        router.push("/sentencer/" + id);
    }

    nextStage () {
        let { id, sentences, tokens, change } = this.state;

        let { router } = this.context;

        appState.setTokenizer(id, sentences, tokens);

        if (change) {
            let mappings = [];
            appState.setMapper(id, mappings);
        }

        router.push("/map/" + id);
    }

    handleTokenChange (index, sourceSelections, targetSelections) {
        let { tokens } = this.state;

        tokens[index] = [sourceSelections, targetSelections];

        this.setState({
            "tokens": tokens,
            "change": true,
        });
    }

    changeActiveIndex (index) {
        this.setState({
            activeIndex: index,
        })
    }

    renderSentencePair (sentencePair, index) {
        let source = sentencePair[0] || "";
        let target = sentencePair[1] || "";

        let { activeIndex, tokens } = this.state;

        let sourceSelections = tokens[index][0] || [];
        let targetSelections = tokens[index][1] || [];

        return (<div className="center-wv">
            <TextView
                input={source}
                output={target}
                ref={"tokenize_" + index}
                onChange={this.handleTokenChange.bind(this)}
                sourceSelections={sourceSelections}
                targetSelections={targetSelections}
                setActiveIndex={this.changeActiveIndex.bind(this, index)}
                currentIndex={activeIndex}
                index={index}
            />
        </div>)
    }

    saveProject () {
        // Don't know any user_ids.
        let { projectTitle, id, user_id = "12345", sourceLanguage, targetLanguage, sentences, tokens } = this.state;

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
        }
    }

    autoTokenizer () {
        let { sentences, sourceLanguage, targetLanguage } = this.state;

        fetch('tokenizer', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sentence_pairs: sentences,
                source_language: sourceLanguage,
                target_language: targetLanguage,
            })
        }).then(response => {
            let obj = response.json();
            // Access fields in the response object.

            let tokens = obj.tokens;
            this.setState({
                "tokens": tokens
            });

            appState.setTokenizer(id, sentences, tokens);
        }).catch(error => console.error(error));
    }

    render () {
        let { tokens, projectTitle, sentences = [], id, activeIndex } = this.state;

        return (
            <div>
                <div className="center-wh">
                    <pre>{`Sentences: ${sentences.length}\nTokens: ${JSON.stringify(tokens)}`}</pre>
                    <div className="center-wv" style={{paddingTop: 100}}>
                        <button
                            onClick={this.previousStage.bind(this)}
                            type="button"
                            className="pt-button pt-intent-warning"
                            style={{margin: 20}}>
                            <span className="pt-icon-standard pt-icon-arrow-left pt-align-left" />
                            Sentencer
                        </button>
                        <button
                            onClick={this.autoTokenizer.bind(this)}
                            type="button"
                            className="pt-button pt-intent-save "
                            style={{margin: 20}}>
                            Auto tokenizer
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
                            Mapper
                            <span className="pt-icon-standard pt-icon-arrow-right pt-align-right" />
                        </button>
                    </div>
                    <h1>{projectTitle}</h1>
                    <div>
                        {sentences.map(this.renderSentencePair.bind(this))}
                    </div>
                </div>
                <div className="center-wv" style={{paddingBottom: 100}}>
                    <button
                        onClick={this.previousStage.bind(this)}
                        type="button"
                        className="pt-button pt-intent-warning"
                        style={{margin: 20}}>
                        <span className="pt-icon-standard pt-icon-arrow-left pt-align-left" />
                        Sentencer
                    </button>
                    <button
                        onClick={this.autoTokenizer.bind(this)}
                        type="button"
                        className="pt-button pt-intent-save "
                        style={{margin: 20}}>
                        Auto tokenizer
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
                        Mapper
                        <span className="pt-icon-standard pt-icon-arrow-right pt-align-right" />
                    </button>
                </div>
            </div>
        );
    }
}

Tokenizer.contextTypes = {
    router: PropTypes.object
};

export default Tokenizer;
