import Promise from "bluebird";

function AppState() {
    let appState = this;
    let user;
    let USER_KEY = "user";

    appState.initializeAppState = () => {
        return Promise.try(() => {
            let userString = localStorage.getItem(USER_KEY);
            if (userString) {
                user = JSON.parse(userString);
            }
        }).catch(error => {
            user = undefined;
            console.error(error);
        });
    };

    appState.getUser = () => user;
    appState.setUser = (theUser) => Promise.try(() => {
        user = theUser;
        return localStorage.setItem(USER_KEY, JSON.stringify(user));
    }).then(() => user);
    appState.clearUser = () => Promise.try(() => {
        user = undefined;
        return localStorage.removeItem(USER_KEY);
    });
}

export default new AppState();
