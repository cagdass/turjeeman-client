import React, { PropTypes } from "react";

import TextView from "./text_view/text_view";

import "./_assets/style.css"

class Project extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "sentences": [],
            "tokens": [],
            "mappings": [],
            "currentInputSelections": [],
            "currentOutputSelections": [],
            "activeIndex": -1,
        };
    }

    componentWillMount () {
        let id = this.props.params.id.trim();

        this.setState({id});
    }

    componentDidMount () {
        // @TODO: Replace this with a backend function that'll retrieve the input/output text.
        this.setState({
            sentences: [["Vodafone Arena'da belki de ligin kaderini çizecek Beşiktaş-Fenerbahçe kapışması öncesi Quaresma antrenmanda şık bir gol attı.", "Vodafone Arena, perhaps the league's destiny to draw Besiktas-Fenerbahce before the fighting Quaresma goal was a stylish goal."]
                , ["Kasımpaşa maçının hazırlıklarını sürdüren Galatasaray'da ise Sabri Sarıoğlu yaptığı gol denemesinde başarılı olamadı.", "In preparation for the match Kasimpasa Galatasaray Sabri Sarioglu did not succeed in trying to score goals."]
                , ["Bu görüntüler sosyal medyada 2 oyuncu arasında kıyaslama yapılmasına neden oldu...", "These images caused comparisons between 2 players in the social media..."]
                , ["Kasımpaşa maçının hazırlıklarını sürdüren Galatasaray'da ise Sabri Sarıoğlu yaptığı gol denemesinde başarılı olamadı.", "In preparation for the match Kasimpasa Galatasaray Sabri Sarioglu did not succeed in trying to score goals."]
                , ["Kasımpaşa maçının hazırlıklarını sürdüren Galatasaray'da ise Sabri Sarıoğlu yaptığı gol denemesinde başarılı olamadı.", "In preparation for the match Kasimpasa Galatasaray Sabri Sarioglu did not succeed in trying to score goals."]
            ],
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

    handleTokenChange () {

    }

    changeActiveIndex (index) {

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
        let { inputText = "", outputText = "", sentences = [], mappings } = this.state;

        return (
            <div className="center-wh">
                <h1>Project</h1>
                <div className="colors-shit center-wv">
                    <div className="color-el" style={{backgroundColor: "darkRed"}}></div>
                    <div className="color-el" style={{backgroundColor: "red"}}></div>
                    <div className="color-el" style={{backgroundColor: "green"}}></div>
                    <div className="color-el" style={{backgroundColor: "blue"}}></div>
                    <div className="color-el" style={{backgroundColor: "#336699"}}></div>
                    <div className="color-el" style={{backgroundColor: "orange"}}></div>
                    <div className="color-el" style={{backgroundColor: "brown"}}></div>
                    <div className="color-el" style={{backgroundColor: "purple"}}></div>
                    <div className="color-el" style={{backgroundColor: "pink"}}></div>
                    <div className="color-el" style={{backgroundColor: "#996633"}}></div>
                    <div className="color-el" style={{backgroundColor: "lightGreen"}}></div>
                </div>
                {mappings.map(this.renderMappingPair.bind(this))}
                <div className="translate-div">
                    <div className="center-wh">
                        {sentences.map(this.renderSentencePair.bind(this))}
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
