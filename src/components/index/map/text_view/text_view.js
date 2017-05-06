import React, {PropTypes} from "react";
import { Popover, PopoverInteractionKind, Position } from "@blueprintjs/core";

import "./_assets/style.css";

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

                if ((start > cur_start && start < cur_end) || (end > cur_start && end < cur_end)) {
                    return;
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

    removeSelection (index) {
        let { selections } = this.state;

        let cur_start = -1;
        let cur_end = -1;

        for (var i = 0; i < selections.length; i++) {
            [cur_start, cur_end] = selections[i];

            if (index >= cur_start && index < cur_end) {
                this.setState({
                    "selections": [...selections.slice(0, i), ...selections.slice(i + 1)]
                });
            }
        }
    }

    clearSelections () {
        this.setState({
            "selected": "",
            "selectedIndices": "",
            "selections": ""
        })
    }

    pickColor (index, selections) {
        const colors = [
            "orange", "red", "green", "blue", "yellow", "brown", "purple", "white"
        ];

        let res = "white";

        for (let i = 0; i < selections.length; i++) {
            if (selections[i][0] <= index && index < selections[i][1]) {
                res = colors[i % colors.length]
            }
        }

        return res;
    }

    renderCharacter (character, index) {
        let { selections } = this.state;
        let color = this.pickColor(index, selections);

        if (character == " ") {
            return <span key={index}>
                {character}
            </span>
        }

        const popoverContent = (
            <div>
                <button className="pt-button pt-popover-dismiss"
                        onClick={this.removeSelection.bind(this, index)}>Remove</button>
            </div>
        );

        return <span>
                {(color === "white")
                ? <span key={index}
                        style={{backgroundColor: color}}>
                    {character}
                </span>
                :
                <Popover
                    content={popoverContent}
                    interactionKind={PopoverInteractionKind.HOVER}
                    popoverClassName="pt-popover-content-sizing"
                    position={Position.TOP}
                    >
                    <span key={index}
                          style={{backgroundColor: color}}>
                        {character}
                    </span>
                </Popover>
            }
        </span>;
    }

    render () {
        let { selected, selections, selectedIndices } = this.state;
        let { input } = this.props;

        let characters = input.split('') || [];

        return (
            <div>
                {/*<pre>{`Selections: ${selections[0]} ${selections.length} ${selections}\nInput: ${input}\nSelind ${selectedIndices}`}</pre>*/}
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

                    <br />
                    <div className="text-area-stuff">
                        {characters.map(this.renderCharacter.bind(this))}
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


