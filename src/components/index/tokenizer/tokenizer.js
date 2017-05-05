import React, { PropTypes } from "react";

import TextView from "./text_view/text_view";

import "./_assets/style.css";
import "../../../assets/css/style.css";

class Tokenizer extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "sentences": [],
        };
    }

    componentWillMount () {
        let id = this.props.params.id;
        this.setState({id});
    }

    componentDidMount () {
        // @TODO: Replace this with a backend function that'll retrieve the input/output text.
        this.setState({
            sentences: [["Vodafone Arena'da belki de ligin kaderini çizecek Beşiktaş-Fenerbahçe kapışması öncesi Quaresma antrenmanda şık bir gol attı.", "Vodafone Arena, perhaps the league's destiny to draw Besiktas-Fenerbahce before the fighting Quaresma goal was a stylish goal."]
                , ["Kasımpaşa maçının hazırlıklarını sürdüren Galatasaray'da ise Sabri Sarıoğlu yaptığı gol denemesinde başarılı olamadı.", "In preparation for the match Kasimpasa Galatasaray Sabri Sarioglu did not succeed in trying to score goals."]
                , ["Bu görüntüler sosyal medyada 2 oyuncu arasında kıyaslama yapılmasına neden oldu...", "These images caused comparisons between 2 players in the social media..."]
            ],
        })
    }

    previousStage () {
        let { id } = this.state;

        let { router } = this.context;

        router.push("/sentencer/" + id);
    }

    nextStage () {
        let { id } = this.state;

        let { router } = this.context;

        router.push("/map/" + id);
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

    renderSentencePair (sentencePair, index) {
        let source = sentencePair[0] || "";
        let target = sentencePair[1] || "";

        return (<div className="center-wv">
            <div className="limit-width">
                <TextView
                    input={source}
                    ref={"inputTextArea" + index}
                    onChange={this.handleInputLanguageChange.bind(this)}
                />
            </div>
            <div className="limit-width">
                <TextView
                    input={target}
                    ref={"outputTextArea" + index}
                    onChange={this.handleInputLanguageChange.bind(this)}
                />
            </div>
        </div>)
    }

    render () {
        let { sentences, id } = this.state;

        return (
            <div>
                <div className="center-wh">
                    <h1>Hello from project with id {id}</h1>
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
