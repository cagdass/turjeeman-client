import React, { PropTypes } from "react";
import { Link } from "react-router";

import { Table, Column, Cell } from "@blueprintjs/table";

import ProjectListing from "./project_listing/project_listing";

import "./_assets/style.css";

import appState from "../../../utility/app_state";

class Dashboard extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            projects: [],
        };
    }

    componentDidMount () {
        // @TODO Replace with the actual backend function
        // this.setState({
        //     projects: [
        //         {
        //             id: 1,
        //             title: "Machine Learning",
        //             sourceLanguage: "English",
        //             targetLanguage: "Turkish",
        //             lastSaved: "23/04/2017",
        //         },
        //         {
        //             id: 2,
        //             title: "Homo Baraaus",
        //             sourceLanguage: "Turkish",
        //             targetLanguage: "English",
        //             lastSaved: "2/05/2017",
        //         },
        //     ],
        // })

        let user = appState.getUser();

        fetch('storage', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user.username,
                status: "fetch",
            })
        }).then(response => {
            let obj = response.json();

            let projects_ = [];
            let projects = obj.projects;

            for (let i = 0; i < projects.length; i++) {
                let project = projects[i];

                let project_ = {
                    user_id: project.user_id,
                    id: project.project_id,
                    title: project.title,
                    lastSaved: project.timestamp,
                    sourceLanguage: project.source_language,
                    targetLanguage: project.target_language,
                    sentences: project.sentence_pairs,
                    tokens: project.tokens,
                    mappings: project.mappings,
                };

                let id = project.project_id;
                appState.setEdit(id, project.sentence_pairs[0], project.sentence_pairs[1], project.source_language, project.target_language, project.title);
                appState.setSentencer(id, project.sentence_pairs);
                appState.setTokenizer(id, project.sentence_pairs, project.tokens);
                appState.setMapper(id, project.mappings);

                projects_.push(project_);
            }

            this.setState({
                projects: projects_,
            });
        }).catch(error => console.error(error));
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
        let user = appState.getUser();
        let { router } = this.context;

        fetch('storage', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user.username,
                status: "create",
            })
        }).then(response => {
            let obj = response.json();
            let id = obj.id;
            router.push("/edit/" + id);
        }).catch(error => console.error(error));
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
