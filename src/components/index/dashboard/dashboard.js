import React, { PropTypes } from "react";
import { Link } from "react-router";

import { Table, Column, Cell } from "@blueprintjs/table";

import ProjectListing from "./project_listing/project_listing";

import "./_assets/style.css";

class Dashboard extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            projects: [],
        };
    }

    componentDidMount () {
        // @TODO Replace with the actual backend function
        this.setState({
            projects: [
                {
                    id: 1,
                    title: "Machine Learning",
                    sourceLanguage: "English",
                    targetLanguage: "Turkish",
                    lastSaved: "23/04/2017",
                },
                {
                    id: 2,
                    title: "Homo Baraaus",
                    sourceLanguage: "Turkish",
                    targetLanguage: "English",
                    lastSaved: "2/05/2017",
                },
            ],
        })
    }

    renderProjectListing (project) {
        let { id, title, sourceLanguage, targetLanguage, lastSaved } = project;

        return (
            <Link style={{color: "black"}} to={`/edit/${id}`}>
                <ProjectListing
                    projectID={id}
                    projectTitle={title}
                    sourceLanguage={sourceLanguage}
                    targetLanguage={targetLanguage}
                    lastSaved={lastSaved}
                />
            </Link>
        );
    }

    newProject () {
        // @TODO Send request to get an id.

        let retrievedID = 123;

        let { router } = this.context;

        router.push("/edit/" + retrievedID);
    }

    render () {
        let { projects } = this.state;

        return (
            <div className="center-wh">
                <h1  style={{paddingTop: 100}}>
                    Dashboard
                </h1>
                <button
                    onClick={this.newProject.bind(this)}
                    type="button"
                    className="pt-button pt-intent-success"
                    style={{margin: 50}}>
                    New project
                    <span className="pt-icon-standard pt-align-right" />
                </button>
                <div className="center-wv">
                    <p className="table-el">Project Title</p>
                    <p className="table-el">Source Language</p>
                    <p className="table-el">Target Language</p>
                    <p className="table-el">Last Saved</p>
                </div>
                {projects.map(this.renderProjectListing.bind(this))}
            </div>
        );
    }
}

Dashboard.contextTypes = {
    router: PropTypes.object
};

export default Dashboard;
