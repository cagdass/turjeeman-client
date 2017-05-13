import Promise from "bluebird";
import appState from "../../../../utility/app_state";

class LoginService {
    loginUser(user = {}) {
        return Promise.try(() => {
            let {password, username} = user;
            if (password === "baraa1234" && username === "orabi@gmail.com") {
                let user = {username: "Baraa", name: "Baraa", surname: "Orabi"};
                return appState.setUser(user);
            } else {
                throw {errorMessage: "Wrong credentials"};
            }
        })
    }

    logoutUser() {
        return Promise.try(() => {
            return appState.clearUser();
        });
    }
}

export default new LoginService();
