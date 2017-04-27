import React, {PropTypes} from "react";
import { Popover, PopoverInteractionKind, Position } from "@blueprintjs/core";

import "./_assets/style.css";

const colors = [
    "orange", "red", "green", "blue", "yellow", "brown", "purple", "white"
];

class TextView extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "selected": "",
            "selectedIndices": [],
            "clicked": true,
            "selections": []
        };
    }

    handleSelect (e) {
        let active_element = document.activeElement;
        let { input } = this.props;

        // this.getText(active_element);

        this.getSelectionHtml();
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

    getSelectionHtml() {
        var html = "";
        let start = -1;
        let end = -1;

        if (typeof window.getSelection != "undefined") {
            var sel = window.getSelection();
            console.log(sel);
            start = sel.anchorOffset;
            end = sel.focusOffset;

            console.log(start, end);
            console.log(sel.rangeCount);

            if (sel.rangeCount) {
                var container = document.createElement("div");
                for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                    console.log(i);
                    container.appendChild(sel.getRangeAt(i).cloneContents());
                    console.log(container);
                }
                html = container.innerHTML.replace(/<\/?[^>]+(>|$)/g, "");
            }
        }
        else if (typeof document.selection != "undefined") {
            console.log("UNDEFINED");
            if (document.selection.type == "Text") {
                html = document.selection.createRange().htmlText;
            }
        }

        this.setState({
            "selected": html,
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

        let { input } = this.props;

        this.props.onChange(input, selections);
    }

    clearSelections () {
        this.setState({
            "selected": "",
            "selectedIndices": "",
            "selections": ""
        })
    }

    pickColor (index, selections) {
       for (let i = 0; i < selections.length; i++) {
            if (selections[0] <= index && index < selections[1]) {
                return colors[i % colors.length]
            }
        }
    }

    renderCharacter (character, index) {
        let { selections } = this.state;

        return <span key={index}
                     style={
                     {
                         backgroundColor: this.pickColor.bind(this, index, selections)
                     }
                     }>
            {character}
        </span>;
    }

    render () {
        let { selected, selections, selectedIndices } = this.state;
        let { input } = this.props;

        let characters = input.split('') || [];

        return (
            <div>
                <pre>{`Selections: ${selections[0]} ${selections.length} ${selections}\nInput: ${input}\nSelind ${selectedIndices}`}</pre>
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
                    <div className="text-area-stuff"
                         onKeyUp={this.handleSelect.bind(this)}
                         onKeyDown={this.handleSelect.bind(this)}
                         onClick={this.handleSelect.bind(this)}>
                        <div>
                            {characters.map(this.renderCharacter.bind(this))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TextView.contextTypes = {
    router: PropTypes.object
};

export default TextView;


