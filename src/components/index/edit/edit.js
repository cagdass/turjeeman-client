import React, { PropTypes } from "react";

import "./_assets/style.css"

class Edit extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "inputText": "",
            "outputText": "",
        };
    }

// {/*<div className="center-wh">*/}
// {/*<h1>Project</h1>*/}
// {/*<pre>*/}
// {/*{`Input text: ${inputText}\nOutput text: ${outputText}\n`}*/}
// {/*</pre>*/}
// {/*{mappings.map(this.renderMappingPair.bind(this))}*/}
// {/*<div className="translate-div">*/}
// {/*<div className="text-area">*/}
// {/*<TextArea*/}
// {/*ref="inputTextArea"*/}
// {/*onChange={this.handleInputLanguageChange.bind(this)}*/}
// {/*/>*/}
// {/*</div>*/}
// {/*<div className="text-area">*/}
// {/*<TextArea*/}
// {/*ref="outputTextArea"*/}
// {/*onChange={this.handleOutputLanguageChange.bind(this)}*/}
// {/*/>*/}
// {/*</div>*/}
// {/*<div>*/}
// {/*<button onClick={this.saveMapping.bind(this)} type="button" className="pt-button pt-intent-success" style={{width: 80, marginTop: -400}}>*/}
// {/*Save mapping*/}
// {/*</button>*/}
// {/*</div>*/}
// {/*</div>*/}
// {/*</div>*/}

    render () {
        let { inputText, outputText, mappings } = this.state;

        return (
            <div></div>

        );
    }
}

Edit.contextTypes = {
    router: PropTypes.object
};

export default Edit;
