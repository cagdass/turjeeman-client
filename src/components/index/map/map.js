import React, { PropTypes } from "react";

import TextView from "./text_view/text_view";

import "./_assets/style.css"

class Project extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "inputText": "",
            "outputText": "",
            "tokens": [],
            "mappings": [],
            "currentInputSelections": [],
            "currentOutputSelections": [],
        };
    }

    componentDidMount () {
        // @TODO: Replace this with a backend function that'll retrieve the input/output text.
        this.setState({
            inputText: "Vodafone Arena'da belki de ligin kaderini çizecek Beşiktaş-Fenerbahçe kapışması öncesi Quaresma antrenmanda şık bir gol attı. Kasımpaşa maçının hazırlıklarını sürdüren Galatasaray'da ise Sabri Sarıoğlu yaptığı gol denemesinde başarılı olamadı. Bu görüntüler sosyal medyada 2 oyuncu arasında kıyaslama yapılmasına neden oldu...",
            outputText: "Vodafone Arena, perhaps the league's destiny to draw Besiktas-Fenerbahce before the fighting Quaresma goal was a stylish goal. In preparation for the match Kasimpasa Galatasaray Sabri Sarioglu did not succeed in trying to score goals. These images caused comparisons between 2 players in the social media ...",
        })
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

    render () {
        let { inputText, outputText, mappings } = this.state;

        return (
            <div className="center-wh">
                <h1>Project</h1>
                {mappings.map(this.renderMappingPair.bind(this))}
                <div className="translate-div">
                    <div className="text-area">
                        <TextView
                            input={inputText}
                            ref="inputTextArea"
                            onChange={this.handleInputLanguageChange.bind(this)}
                        />
                    </div>
                    <div className="text-area">
                        <TextView
                            input={outputText}
                            ref="outputTextArea"
                            onChange={this.handleOutputLanguageChange.bind(this)}
                        />
                    </div>
                    <div>
                        <button onClick={this.saveMapping.bind(this)} type="button" className="pt-button pt-intent-success" style={{width: 80, marginTop: -400}}>
                            Save mapping
                        </button>
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
