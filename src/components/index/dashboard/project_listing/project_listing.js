import React, { PropTypes } from "react";

import "./_assets/style.css";
import "../../../../assets/css/style.css";

class ProjectListing extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            projectTitle: "",
            sourceLanguage: "",
            targetLanguage: "",
            lastSaved: "",
            projectID: "",
        };
    }

    render () {
        let { projectID, projectTitle, sourceLanguage, targetLanguage, lastSaved } = this.props;

        return (
            <div className="center-wv">
                <p className="padding-20">{projectTitle}</p>
                <p className="padding-20">{sourceLanguage}</p>
                <p className="padding-20">{targetLanguage}</p>
                <p className="padding-20">{lastSaved}</p>
            </div>
        );
    }
}

ProjectListing.contextTypes = {
    router: PropTypes.object
};

export default ProjectListing;
