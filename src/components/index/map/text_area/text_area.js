import React, {PropTypes} from "react";
import { Popover, PopoverInteractionKind, Position } from "@blueprintjs/core";

import "./_assets/style.css";

class TextArea extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "input": "",
            "selected": "",
            "selectedIndices": [],
            "clicked": true,
            "selections": []
        };
    }

    handleChange (e) {
        let { selections } = this.state;

        let input = e.target.value;

        this.setState({
            "input": input,
        });

        this.props.onChange(input, selections);
    }

    handleSelect (e) {
        let active_element = document.activeElement;
        let input = e.target.value;

        this.getText(active_element);


        this.setState({
            "input": e.target.value,
        });

        let { selections } = this.state;

        this.props.onChange(input, selections);
    }

    getText (active_element) {
        let selected = active_element.value.substring(active_element.selectionStart, active_element.selectionEnd) || "";
        let start = active_element.selectionStart || 0;
        let end =  active_element.selectionEnd || -1;

        this.setState({
            "selected": selected,
            "selectedIndices": [start, end]
        });
    }

    addSelection () {
        let { selectedIndices, selected, selections } = this.state;

        if (selected.length > 0) {
            let [start, end] = selectedIndices;
            let cur_start = -1;
            let cur_end = -1;
            let index = -1;

            for (var i = 0; i < selections.length && index == -1; i++) {
                [cur_start, cur_end] = selections[i];

                if (cur_start === start && cur_end === end) {
                    index = i;
                }
            }

            if (index !== -1) {
                selections = [...selections.slice(0, index), ...selections.slice(index + 1)];

                this.setState({
                    "selected": "",
                    "selections": selections,
                });
            }
            else {
                selections = [...selections, selectedIndices];

                this.setState({
                    "selected": "",
                    "selections": selections,
                });
            }
        }

        let { input } = this.state;

        this.props.onChange(input, selections);
    }

    clearSelections () {
        this.setState({
            "selected": "",
            "selectedIndices": "",
            "selections": ""
        })
    }

    render () {
        let { input, selected, selections, selectedIndices } = this.state;

        return (
            <div>
                <pre>{`${selections[0]} ${selections.length} ${selections}`}</pre>
                <div>


                    <div className="selection-stuff">
                        <b>Current selection: </b>
                        {selected}
                    </div>
                    <div className="buttons-stuff">
                        <button type="button" onClick={this.addSelection.bind(this)} className="pt-button pt-intent-primary">
                            Map
                        </button>
                    </div>
                    <hr />
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


