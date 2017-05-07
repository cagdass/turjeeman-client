import React, {PropTypes} from "react";
import { Popover, PopoverInteractionKind, Position } from "@blueprintjs/core";

import "./_assets/style.css";
import "../../../../assets/css/style.css";

const colors = ["darkRed", "red", "green", "blue", "#336699", "orange", "brown", "purple", "pink", "#996633", "lightGreen", "#008844"];

class TextView extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "selected": "",
            "sentenceMappings": [],
            "sourceSelections": [],
            "targetSelections": [],
            "selectedIndices": [],
            "tokens": [],
        };
    }

    componentWillMount () {
        let { index, tokens = []} = this.props;
        let { sentenceMappings } = this.state;

        for (let i = 0; i < colors.length; i++) {
            sentenceMappings.push([]);
            sentenceMappings[i].push([]);
            sentenceMappings[i].push([]);
        }

        this.setState({
            "index": index,
            "tokens": tokens,
            "sentenceMappings": sentenceMappings,
        })
    }

    handleSelect (fieldName, e) {
        let { activeColor } = this.props;
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

    toggleThis (index, field) {
        let { sentenceMappings } = this.state;
        let { activeColor } = this.props;
        let index1 = -1;
        let index2 = -1;

        let fieldIndex = (field === "input") ? 0 : 1;

        let selections = [];
        if (fieldIndex === 0) {
            selections = this.state.sourceSelections;
        }
        else {
            selections = this.state.targetSelections;
        }

        for (let i = 0; i < sentenceMappings.length; i++) {
            let curColor = sentenceMappings[i][fieldIndex];
            for (let j = 0; j < curColor.length; j++) {
                if (curColor[j][0] <= index && index < curColor[j][1]) {
                    index1 = i;
                    index2 = j;
                }
            }
        }

        if (index1 !== -1 && index2 !== -1) {
            let curColor = sentenceMappings[index1][fieldIndex];
            let newCurColor = [...curColor.slice(0, index2), ...curColor.slice(index2 + 1)];

            sentenceMappings[index1][fieldIndex] = newCurColor;
            let del = -1;

            for (let i = 0; i < selections.length; i++) {
                let cur = selections[i].indices;
                if (cur[0] <= index && index < cur[1]) {
                    del = i;
                    break;
                }
            }

            selections = [...selections.slice(0, del), ...selections.slice(del + 1)];

            if (fieldIndex === 0) {
                this.setState({
                    sentenceMappings: sentenceMappings,
                    sourceSelections: selections,
                });
            }
            else {
                this.setState({
                    sentenceMappings: sentenceMappings,
                    targetSelections: selections,
                });
            }
        }
        else {
            let { tokens } = this.state;
            let tokens_ = tokens[fieldIndex];
            let save = [-1, -1];

            for (let i = 0; i < tokens_.length; i++) {
                let cur = tokens_[i];
                let cur_start = cur[0];
                let cur_end = cur[1];

                if (cur_start <= index && index < cur_end) {
                    sentenceMappings[activeColor][fieldIndex].push([cur_start, cur_end]);
                    save = [cur_start, cur_end];
                    break;
                }
            }

            if (save[0] !== -1 && save[1] !== -1) {
                selections = [...selections, {
                    color: activeColor,
                    indices: save,
                }];
            }

            if (fieldIndex === 0) {
                this.setState({
                    sentenceMappings: sentenceMappings,
                    sourceSelections: selections,
                });
            }
            else {
                this.setState({
                    sentenceMappings: sentenceMappings,
                    targetSelections: selections,
                });
            }
        }

        let thisGuy = this.props.index;

        this.props.onChange(thisGuy, sentenceMappings);
    }

    pickColor (index, selections, selections2) {
        const colors_ = [
            "darkgray", "lightgray"
        ];

        const colors = ["darkRed", "red", "green", "blue", "#336699", "orange", "brown", "purple", "pink", "#996633", "lightGreen", "#008844"];

        let res = "white";
        let indices = [-1,-1];

        for (let i = 0; i < selections.length; i++) {
            if (selections[i][0] <= index && index < selections[i][1]) {
                indices = selections[i];
                res = colors_[i % colors_.length]
            }
        }

        for (let i = 0; i < selections2.length; i++) {
            if (selections2[i] !== undefined) {
                let cur = selections2[i].indices;
                if (cur[0] <= index && index < cur[1]) {
                    indices = cur;
                    res = colors[selections2[i].color % colors.length];
                }
            }
        }

        return {
            color: res,
            indices: indices,
        };
    }

    renderCharacter (field, character, index) {
        const colors = ["darkRed", "red", "green", "blue", "#336699", "orange", "brown", "purple", "pink", "#996633", "lightGreen", "#008844"];
        let selections = [];
        let { sourceSelections, targetSelections, sentenceMappings = [[[-1,-1]], [[-1,-1]]], tokens = [[[-1,-1]], [[-1,-1]]] } = this.state;
        let tokenish = [];

        if (field === "input") {
            if (tokens !== undefined && tokens.length > 1) {
                tokenish = tokens[0];
                selections = sourceSelections;
            }
        }
        else if (field === "output") {
            if (tokens !== undefined && tokens.length > 1) {
                tokenish = tokens[1];
                selections = targetSelections;
            }
        }

        let obj = this.pickColor(index, tokenish, selections);
        let color = obj.color;
        let selection = obj.indices;

        if (character === " ") {
            return <span key={index}>
                {character}
            </span>
        }

        return <span>
                {(color === "white")
                    ? <span key={index}
                            style={{backgroundColor: color}}>
                    {character}
                </span>
                    :
                    <span key={index}
                          style={{backgroundColor: color}}
                          onClick={this.toggleThis.bind(this, index, field)}
                        >
                        {character}
                    </span>
                }
        </span>;
    }

    render () {
        let { tokens, sentenceMappings, sourceSelections, targetSelections } = this.state;
        let { activeColor, input, output, currentIndex } = this.props;

        let input_ = input.split('') || [];
        let output_ = output.split('') || [];

        return (
            <div>
                <div>
                    {/*<pre>{`Tokens: ${tokens}\nMappings: ${JSON.stringify(sentenceMappings)}\nactiveColor: ${activeColor}\nsourceSelections: ${JSON.stringify(sourceSelections)}\ntargetSelection: ${JSON.stringify(targetSelections)}`}</pre>*/}
                    <div className="center-wh-stretch">
                        <div className="center-wv">
                            <div className="text-area-stuff">
                                {input_.map(this.renderCharacter.bind(this, "input"))}
                            </div>
                            <div className="text-area-stuff">
                                {output_.map(this.renderCharacter.bind(this, "output"))}
                            </div>
                        </div>
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


