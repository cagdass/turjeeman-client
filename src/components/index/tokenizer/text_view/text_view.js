import React, {PropTypes} from "react";
import { Popover, PopoverInteractionKind, Position } from "@blueprintjs/core";

import "./_assets/style.css";
import "../../../../assets/css/style.css";

class TextView extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "index": "",
            "selected": "",
            "sourceSelections": [],
            "targetSelections": [],
            "selectedIndices": [],
            "clicked": true,
            "showModal": false,
            "latest": "",
        };
    }

    componentWillMount () {
        let { index, currentIndex } = this.props;

        this.setState({
            "index": index,
            "showModal": (currentIndex === index),
        })
    }

    handleSelect (fieldName, e) {
        let { index } = this.props;
        let { sourceSelections, targetSelections } = this.state;

        this.getSelectionHtml();


        if (fieldName == "input") {
            this.setState({
                latest: "sourceSelections",
            });
        }
        else if (fieldName == "output") {
            this.setState({
                latest: "targetSelections",
            });
        }
    }

    getSelectionHtml() {
        var html = "";
        let start = -1;
        let end = -1;

        if (typeof window.getSelection != "undefined") {
            var sel = window.getSelection();
            start = sel.anchorOffset;
            end = sel.focusOffset;

            if (sel.rangeCount) {
                var container = document.createElement("div");
                for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                    container.appendChild(sel.getRangeAt(i).cloneContents());
                }
                html = container.innerHTML.replace(/<\/?[^>]+(>|$)/g, "");
            }
        }
        else if (typeof document.selection != "undefined") {
            if (document.selection.type == "Text") {
                html = document.selection.createRange().htmlText;
            }
        }

        if (start > end) {
            let mem = start;
            start = end;
            end = mem;
        }

        this.setState({
            "selected": html,
            "selectedIndices": [start, end]
        });
    }

    addSelection () {
        let { selected, selectedIndices, latest } = this.state;
        let selections = this.state[latest];

        if (selected.trim().length == 0) {
            return;
        }

        if (selected.length > 0) {
            let [start, end] = selectedIndices;
            let cur_start = -1;
            let cur_end = -1;
            let index = -1;
            let smallest = -1;

            for (var i = 0; i < selections.length && index == -1; i++) {
                [cur_start, cur_end] = selections[i];

                if (cur_start === start && cur_end === end) {
                    index = i;
                }

                if ((start > cur_start && start < cur_end) || (end > cur_start && end < cur_end) || (start < cur_start && end > cur_end)) {
                    return;
                }

                if (cur_start < start) {
                    smallest = i;
                }
            }

            if (index !== -1) {
                selections = [...selections.slice(0, index), ...selections.slice(index + 1)];

                this.setState({
                    "selected": "",
                    [latest]: selections,
                });
            }
            else {
                if (smallest === -1) {
                    selections = [selectedIndices, ...selections];
                }
                else {
                    selections = [...selections.slice(0, smallest + 1), selectedIndices, ...selections.slice(smallest + 1)];
                }

                this.setState({
                    "selected": "",
                    [latest]: selections,
                });
            }
        }

        let { index } = this.props;
        let { sourceSelections, targetSelections } = this.state;

        if (latest === "sourceSelections") {
            sourceSelections = selections;
        }
        else if (latest === "targetSelections") {
            targetSelections = selections;
        }

        this.props.onChange(index, sourceSelections, targetSelections);
    }

    removeSelection (fieldName, index) {
        let selections = this.state[fieldName];
        let index_  = this.props.index;
        let { sourceSelections, targetSelections } = this.state;

        let cur_start = -1;
        let cur_end = -1;

        for (var i = 0; i < selections.length; i++) {
            [cur_start, cur_end] = selections[i];

            if (index >= cur_start && index < cur_end) {
                selections = [...selections.slice(0, i), ...selections.slice(i + 1)];

                this.setState({
                    [fieldName]: selections,
                });
            }
        }

        if (fieldName === "sourceSelections") {
            sourceSelections = selections;
        }
        else if (fieldName === "targetSelections") {
            targetSelections = selections;
        }
        this.props.onChange(index_, sourceSelections, targetSelections);
    }

    clearSelections () {
        this.setState({
            "selected": "",
            "selectedIndices": "",
            "sourceSelections": "",
            "targetSelections": "",
        })
    }

    pickColor (index, selections) {
        const colors = [
            "darkgray", "lightgray"
        ];

        let res = "white";

        for (let i = 0; i < selections.length; i++) {
            if (selections[i][0] <= index && index < selections[i][1]) {
                res = colors[i % colors.length]
            }
        }

        return res;
    }

    showModal () {
        let { index } = this.state;
        this.props.setActiveIndex(index);
    }

    renderCharacter (field, character, index) {
        let selections = [];
        if (field === "input") {
            selections = this.state.sourceSelections;
        }
        else if (field === "output") {
            selections = this.state.targetSelections;
        }

        let color = this.pickColor(index, selections);

        if (character == " ") {
            return <span key={index}>
                {character}
            </span>
        }

        let fieldName = (field === "input") ? "sourceSelections" : "targetSelections";

        const popoverContent = (
            <div>
                <button className="pt-button pt-popover-dismiss"
                        onClick={this.removeSelection.bind(this, fieldName, index)}>Remove</button>
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
        let { index, selected, sourceSelections, targetSelections, selectedIndices, latest } = this.state;
        let { input, output, currentIndex } = this.props;

        let showModal = (index === currentIndex);


        let input_ = input.split('') || [];
        let output_ = output.split('') || [];

        return (
            <div>
                {/*onClick={this.addSelection.bind(this)}*/}
                {/*<pre>{`Selected: ${selected}\nLatest: ${latest}\nSource Selections: ${sourceSelections}\nTarget Selections ${targetSelections}\nInput: ${input}\nSelind ${selectedIndices}`}</pre>*/}
                {/*<pre>{`index: ${index}\ncurrentIndex: ${currentIndex}\nshowModal: ${showModal}`}</pre>*/}
                <div>
                    <div className="center-wh-stretch">
                        <div className="center-wv">
                            <div className="buttons-stuff">
                                <button type="button"
                                        onClick={this.showModal.bind(this)}
                                        className="pt-button pt-intent-primary">
                                    Tokenize
                                </button>
                            </div>
                            <div className="text-area-stuff">
                                {input_.map(this.renderCharacter.bind(this, "input"))}
                            </div>
                            <div className="text-area-stuff">
                                {output_.map(this.renderCharacter.bind(this, "output"))}
                            </div>
                        </div>
                        {showModal &&
                            <div className="center-wh">
                                <div className="center-wv">
                                    <div className="text-area-stuff scrollable-div"
                                         onKeyUp={this.handleSelect.bind(this, "input")}
                                         onKeyDown={this.handleSelect.bind(this, "input")}
                                         onClick={this.handleSelect.bind(this, "input")}>
                                        <div>
                                            {input}
                                        </div>
                                    </div>
                                    <div className="text-area-stuff scrollable-div"
                                         onKeyUp={this.handleSelect.bind(this, "output")}
                                         onKeyDown={this.handleSelect.bind(this, "output")}
                                         onClick={this.handleSelect.bind(this, "output")}>
                                        <div>
                                            {output}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <button type="button" onClick={this.addSelection.bind(this)} className="pt-button pt-intent-primary">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <hr />
                    <br />
                </div>
            </div>
        );
    }
}

TextView.contextTypes = {
    router: PropTypes.object
};

export default TextView;


