import React, { PropTypes } from "react";

import TextView from "./text_view/text_view";

import "./_assets/style.css"

const colors = ["darkRed", "red", "green", "blue", "#336699", "orange", "brown", "purple", "pink", "#996633", "lightGreen"];

class Project extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "id": "",
            "sentences": [],
            "tokens": [],
            "mappings": [],
            "currentInputSelections": [],
            "currentOutputSelections": [],
            "activeIndex": -1,
            "activeColor": -1,
            "activeColorLiteral": "",
        };
    }

    componentWillMount () {
        let id = this.props.params.id.trim();

        this.setState({id});

        // let tokenizer = appState.getTokenizer(id);
        // let edit = appState.getEdit(id);
        // let map = appState.getMap(id);

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

    render () {
        let { inputText = "", outputText = "", sentences = [], mappings, activeColor } = this.state;

        let nums = [0,1,2,3,4,5,6,7,8,9,10];

        return (
            <div className="center-wh">
                <h1>Project</h1>
                <div className="colors-shit center-wv">
                    {nums.map(this.renderColorPicks.bind(this))}
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
