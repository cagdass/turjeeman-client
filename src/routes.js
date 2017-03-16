import React from "react";
import {Route, IndexRoute} from "react-router";

import Index from "./components/index/index";
import Home from "./components/index/home/home";
import Login from "./components/index/login/login";
import Dashboard from "./components/index/dashboard/dashboard";
import Project from "./components/index/project/project";
import NoMatch from "components/no_match";

import routesService from "./routes/_services/routes_service";

const routes = (
    <Route path="/" component={Index}>
        <IndexRoute component={Home} onEnter={routesService.requireAuth} />
        <Route path="login" component={Login} onEnter={routesService.alreadyLoggedIn} />
        <Route path="dashboard" component={Dashboard} />
        <Route path="project" component={Project} />
        <Route path="*" component={NoMatch} />
    </Route>
);

export default routes;