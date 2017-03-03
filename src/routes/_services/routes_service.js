import appState from "../../utility/app_state";

class RoutesService {
    requireAuth(nextState, replace) {
        let user = appState.getUser();

        if (!user) {
            replace({
                pathname: "/login",
                state: {nextPathname: nextState.location.pathname, nextQuery: nextState.location.query}
            })
        }
    }

    alreadyLoggedIn(nextState, replace) {
        let user = appState.getUser();

        if (user) {
            replace({pathname: "/"});
        }
    }
}

export default new RoutesService();
