import React, { PropTypes } from "react";

import "./_assets/style.css";
import "../../../assets/css/style.css";

class Sentencer extends React.Component {
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

    renderSentencePair (sentencePair) {
        return (<div className="center-wv padding-left-10p">
            <div className="padding-20 wh">
                <span className="pt-icon-size pt-icon-add padding-10" />
                <span className="pt-icon-size pt-icon-delete padding-10" />
            </div>
            <div className="padding-10 limit-width">
                <span className="pt-intent-primary">{sentencePair[0]}</span>
            </div>
            <div className="padding-10 limit-width">
                <span className="pt-intent-primary">{sentencePair[1]}</span>
            </div>
        </div>
        );
    }

    previousStage () {
        let { id } = this.state;

        let { router } = this.context;

        router.push("/edit/" + id);
    }

    nextStage () {
        let { id } = this.state;

        let { router } = this.context;

        router.push("/tokenizer/" + id);
    }

    render () {
        let { sentences, id } = this.state;

        return (
            <div>
                <div className="center-wh">
                    <h1>Hello from project with id {id}</h1>
                </div>
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
                        onClick={this.nextStage.bind(this)}
                        type="button"
                        className="pt-button pt-intent-success"
                        style={{margin: 20}}>
                        Tokenizer
                        <span className="pt-icon-standard pt-icon-arrow-right pt-align-right" />
                    </button>
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
