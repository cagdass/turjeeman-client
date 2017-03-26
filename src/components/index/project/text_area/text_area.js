import React, {PropTypes} from "react";
import { Popover, PopoverInteractionKind, Position } from "@blueprintjs/core";

import "./_assets/style.css";

class TextArea extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "input": "",
            "selected": "",
            "clicked": true,
            "selections": []
        };
    }

    handleChange (e) {
        this.setState({
            "input": e.target.value,
        });
    }

    handleSelect (e) {
        console.log(document.activeElement);
        let al = document.activeElement;
        console.log(this.getText(al));
        this.setState({
            "input": e.target.value,
        });
    }

    getText (elem) {
        let selected = elem.value.substring(elem.selectionStart, elem.selectionEnd) || "";

        this.setState({
            "selected": selected,
        })
    }



    addSelection () {
        let { selected, selections } = this.state;

        if (selected.length > 0) {

            let index = selections.indexOf(selected);

            if (index !== -1) {
                this.setState({
                    "selected": "",
                    "selections": [...selections.slice(0, index), ...selections.slice(index + 1)],
                });
            }
            else {
                this.setState({
                    "selected": "",
                    "selections": [...selections, selected],
                });
            }
        }
    }

    render () {
        let { input, selected, selections } = this.state;

        return (
            <div>
                <pre>{`${selections[0]} ${selections.length} ${selections}`}</pre>
                <div>
                    <div className="selection-stuff">
                        {selected}
                    </div>
                    <div className="buttons-stuff">
                        <button type="button" onClick={this.addSelection.bind(this)} className="pt-button pt-intent-primary">
                            Select
                        </button>
                    </div>
                    <div className="text-area-stuff">
                        <textarea id="div" type="text"
                          onChange={this.handleChange.bind(this)}
                          onKeyUp={this.handleSelect.bind(this)}
                          onKeyDown={this.handleSelect.bind(this)}
                          onClick={this.handleSelect.bind(this)} className="pt-input pt-fill" dir="auto"></textarea>
                    </div>
                </div>
            </div>
        );
    }

}

TextArea.contextTypes = {
    router: PropTypes.object
};

export default TextArea;


