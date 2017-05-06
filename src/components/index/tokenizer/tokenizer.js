import React, { PropTypes } from "react";

import TextView from "./text_view/text_view";

import "./_assets/style.css";
import "../../../assets/css/style.css";

class Tokenizer extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "sentences": [],
            "tokens": [],
            "activeIndex": -1,
        };
    }

    componentWillMount () {
        let id = this.props.params.id;
        this.setState({id});
    }

    componentDidMount () {
        // @TODO: Replace this with a backend function that'll retrieve the input/output text.
        let sentences = [["Vodafone Arena'da belki de ligin kaderini çizecek Beşiktaş-Fenerbahçe kapışması öncesi Quaresma antrenmanda şık bir gol attı.", "Vodafone Arena, perhaps the league's destiny to draw Besiktas-Fenerbahce before the fighting Quaresma goal was a stylish goal."]
            , ["Kasımpaşa maçının hazırlıklarını sürdüren Galatasaray'da ise Sabri Sarıoğlu yaptığı gol denemesinde başarılı olamadı.", "In preparation for the match Kasimpasa Galatasaray Sabri Sarioglu did not succeed in trying to score goals."]
            , ["Bu görüntüler sosyal medyada 2 oyuncu arasında kıyaslama yapılmasına neden oldu...", "These images caused comparisons between 2 players in the social media..."]
        ];

        let tokens = [];
        for (let i = 0; i < sentences.length; i++) {
            tokens.push([]);
        }

        this.setState({
            sentences: sentences,
            tokens: tokens,
        });
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

    handleTokenChange (index, sourceSelections, targetSelections) {
        let { tokens } = this.state;

        tokens[index] = [sourceSelections, targetSelections];

        this.setState({tokens});
    }

    changeActiveIndex (index) {
        this.setState({
            activeIndex: index,
        })
    }

    renderSentencePair (sentencePair, index) {
        let source = sentencePair[0] || "";
        let target = sentencePair[1] || "";

        let { activeIndex } = this.state;

        return (<div className="center-wv">
            <TextView
                input={source}
                output={target}
                ref={"tokenize_" + index}
                onChange={this.handleTokenChange.bind(this)}
                setActiveIndex={this.changeActiveIndex.bind(this, index)}
                currentIndex={activeIndex}
                index={index}
            />
        </div>)
    }

    render () {
        let { tokens, sentences, id, activeIndex } = this.state;

        return (
            <div>
                <div className="center-wh">
                    {/*<pre>{`Tokens: ${tokens}`}</pre>*/}
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
