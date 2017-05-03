import React from "react";
import {Route, IndexRoute} from "react-router";

import Index from "./components/index/index";
import Login from "./components/index/login/login";
import Register from "./components/index/register/register";
import Dashboard from "./components/index/dashboard/dashboard";
import Map from "./components/index/map/map";
import Edit from "./components/index/edit/edit";
import NoMatch from "components/no_match";

import routesService from "./routes/_services/routes_service";

const routes = (
    <Route path="/" component={Index} >
        <IndexRoute component={Dashboard} onEnter={routesService.requireAuth} />
        <Route path="login" component={Login} onEnter={routesService.alreadyLoggedIn} />
        <Route path="register" component={Register} />
        <Route path="dashboard" component={Dashboard} onEnter={routesService.requireAuth} />
        <Route path="map" component={Map} onEnter={routesService.requireAuth} />
        <Route path="edit" component={Edit} onEnter={routesService.requireAuth} />
        <Route path="*" component={NoMatch} onEnter={routesService.requireAuth} />
    </Route>
);

export default routes;