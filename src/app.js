import moment from "moment";
import Promise from "bluebird";
import React from "react";
import ReactDOM, {render} from "react-dom";
import {Router, hashHistory}from "react-router";

import "whatwg-fetch";
import "./assets/css/style.css";

import appState from "utility/app_state";

import routes from "./routes.js";

Promise.config({longStackTraces: true, warnings: true});

appState.initializeAppState().then(() => {
    render(<Router routes={routes} history={hashHistory}/>, document.getElementById("content"));
});
