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
            "change": false,
        };
    }

    componentDidMount () {
        let id = this.props.params.id.trim();
        this.setState({id});

        let edit = appState.getEdit(id);

        let sentences = [["", ""]];

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

        sentences = [["Machine learning is the subfield of computer science that gives machines the ability to learn without being explicitly programmed", "Makine ogrenmesi (yapay ogrenme) bilgisayar biliminin bir altdali olup acikca programlanmadiklari halde makinelere ogrenme yetisi verir"], [" Machine learning has close relationship to pattern recognition and artificial intelligence", " Yapay ogrenme, oruntu tanima, yapay zeka alanlariyla yakindan iliskilidir"], [" The key idea behind machine learning is to learn from data and make predictions when new data is encountered", " Yapay ogrenmenin arkasindaki anahtar nokta verilerden ogrenmek ve yeni veri ile karsilasildiginda tahminde bulunmaktir. Ne kadar cok veri, o kadar iyi demektir"], [" Machine learning algorithms learn models on the training data and the prediction accuracy of the models increase proportional to size of the training set. The more the data, the better it is", " Ayni zamanda"], [" At the same time, this field has very strong relationships to statistics, linear algebra and mathematical optimization", " bu alan istatistik, lineer cebir ve matematiksel optimizasyon konulariyla cok guclu baglantisi vardir"], [" Its robust mathematical basis gives rise to reliable algorithms that learn accurate models on the data", " Onun saglam matematiksel temelleri, veriler uzerinden tutarli modeller ogrenen guvenilir algoritmalarin ortaya cikmasini saglamaktir"], [" There are different subfields of machine learning: supervised learning, unsupervised learning, reinforcement learning, active learning etc", " Yapay ogrenmenin farkli altdallari bulunmaktadir: gozetimli ogrenme, gozetimsiz ogrenme, takviyeli ogrenme, aktif ogrenme vb"], [" Supervised learning is one of the most well-known families of learning algorithms", " Gozetimli ogrenme en cok bilinen ogrenme algoritmalari ailelerinden birisidir. Gozetimli ogrenmede, egitme verileri etiketlenmistir ve algoritmaya bu sekilde girilirler. Kara agaci ogrenmesi bir gozetimli ogrenme ornegidir"], [" In supervised learning, training data points are labeled and presented to the algorithm in that way. Decision tree learning is an example of supervised learning", " Agacin her bir nodulunde"], [" At each node of the tree, the algorithms makes a decision based on the labels or values of data points. The aim is to ask the correct question at each node. Unsupervised learning is a little bit different from supervised learning in the sense that data points are not labeled", " algoritma verilerin etiket veya degerlerine dayanarak karar alir"], [" The algorithm groups data points based on their distribution on some n-dimensional space", " Burada amac her nodulde dogru soruyu sormaktir. Gozetimsiz ogrenme ise verilerin etiketlenmemis olmasindan dolayi gozetimli ogrenmeye gore biraz daha farklidir. Algoritma, verilerin n-boyutlu uzayda dagilimlarina gore verileri gruplar"], [" Clustering algorithms can be a good example for unsupervised learning methods", " Kumeleme algoritmalari gozetimsiz ogrenme algoritmalarina iyi bir ornek olabilir"], [" Clustering algorithms group data points that resemble each other", " Kumeleme algoritmalari verileri birbirlerine benzerliklerine gore gruplar"], [" One of the key points of clustering algorithms is choosing the correct distance measure to compute how similar or dissimilar each data point is", " Kilit noktalardan bir tanesi verilerin ne kadar benzer veya farkli oldugunu olcmek icin dogru uzaklik olcusunu secmektir"], [" To find the structure in the data, one should experiment with distance measures and clustering methods depending on the characteristics of the data", " Verilerin yapisini kesfetmek icin, verilerin karasteristik ozelliklerine bagli olarak uzaklik olculeri ve kumeleme algoritmalariyla deney yapmak gereklidir"]];

        this.setState({sentences});
    }

    autoSentencer () {
        let { inputText, outputText } = this.state;

        fetch('mapper', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sentence_pairs: [inputText, outputText],
            })
        }).then(response => {
            let obj = response.json();
            // Access fields in the response object.

            let sentences = obj.sentences;
            this.setState({
                "sentences": sentences
            })

        }).catch(error => console.error(error));
    }

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
                "sentences": sentences,
                "change": true,
            });
        }
    }

    addSentence (index) {
        let { sentences } = this.state;

        sentences = [...sentences.slice(0, index), ["", ""], ...sentences.slice(index)];

        this.setState({
            "sentences": sentences,
            "change": true,
        });
    }

    editSentence (index, index_, value) {
        let { sentences } = this.state;

        sentences[index][index_] = value;

        this.setState({
            "sentences": sentences,
            "change": true,
        });
    }

    renderSentencePair (sentencePair, index) {
        console.log("Hola");
        console.log(sentencePair);

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
                    multiline minLines={3} maxLines={1000}
                    placeholder="Enter a sentence"
                    selectAllOnFocus={this.state.selectAllOnFocus}
                    value={sentencePair[0]}
                    onChange={this.editSentence.bind(this, index, 0)}
                />
            </div>
            <div className="padding-10 limit-width">
                <EditableText
                    multiline minLines={3} maxLines={1000}
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
        let { id, sentences, change } = this.state;

        let { router } = this.context;

        appState.setSentencer(id, sentences);

        if (change) {
            let tokens = [];
            let mappings = [];
            appState.setMapper(id, mappings);
            appState.setTokenizer(id, sentences, tokens);
        }

        router.push("/edit/" + id);
    }

    nextStage () {
        let { id, sentences, change } = this.state;

        let { router } = this.context;

        appState.setSentencer(id, sentences);

        if (change) {
            let tokens = [];
            let mappings = [];
            appState.setMapper(id, mappings);
            appState.setTokenizer(id, sentences, tokens);
        }

        router.push("/tokenizer/" + id);
    }

    saveProject () {
        // Don't know any user_ids.
        let { projectTitle, id, user_id = "12345", sourceLanguage, targetLanguage, sentences } = this.state;

        // The request object.
        let request = {
            "user_id": user_id,
            "project_id": id,
            "title": projectTitle,
            "timestamp": (Math.floor(Date.now() / 1000)),
            "source_language": sourceLanguage,
            "target_language": targetLanguage,
            "sentence_pairs": sentences,
        }
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
                        onClick={this.autoSentencer.bind(this)}
                        type="button"
                        className="pt-button pt-intent-save "
                        style={{margin: 20}}>
                        Auto sentencer
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
                        onClick={this.autoSentencer.bind(this)}
                        type="button"
                        className="pt-button pt-intent-save "
                        style={{margin: 20}}>
                        Auto sentencer
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
