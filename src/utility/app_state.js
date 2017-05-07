import Promise from "bluebird";

function AppState() {
    let appState = this;
    let user;
    let USER_KEY = "user";

    let PROJECTS_KEY = "projects";
    let projects = [];

    let TOKENIZER_KEY = "tokenizer";
    let tokenizers = [];

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

    appState.getTokenizer = (id) => {
        for (let i = 0; i < tokenizers.length; i++) {
            if (tokenizers[i].id === id) {
                return tokenizers[i];
            }
        }

        return {};
    };

    appState.setTokenizer = (id, sentences, tokens) => Promise.try(() => {
        let index = -1;
        let tokenize = {
            "id": id,
            "sentences": sentences,
            "tokens": tokens,
        };

        for (let i = 0; i < tokenizers.length; i++) {
            if (tokenizers[i].id === id) {
                index = i;
                break;
            }
        }

        if (index === -1) {
            tokenizers.push(tokenize);
        }
        else {
            tokenizers[index] = tokenize;
        }
        return localStorage.setItem(TOKENIZER_KEY, JSON.stringify(tokenizers));
    }).then(() => tokenizers);

    appState.getEdit = (id) => {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].id === id) {
                return projects[i];
            }
        }

        return {};
    };

    appState.setEdit = (id, inputText, outputText, sourceLanguage, targetLanguage, projectTitle) => Promise.try(() => {
        let index = -1;
        let project = {
            "id": id,
            "inputText": inputText,
            "outputText": outputText,
            "sourceLanguage": sourceLanguage,
            "targetLanguage": targetLanguage,
            "projectTitle": projectTitle,
        };

        for (let i = 0; i < projects.length; i++) {
            if (projects[i].id === id) {
                index = i;
                break
            }
        }

        if (index === -1) {
            projects.push(project);
        }
        else {
            projects[index] = project;
        }
        return localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    }).then(() => projects);

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
