import React, {PropTypes} from "react";
import { Link } from "react-router";
import { Popover, PopoverInteractionKind, Position, Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import * as Blueprint from "@blueprintjs/core";

import appState from "../../../utility/app_state";
import loginService from "../login/_services/login_service";
import "./_assets/style.css";

const navbarStyle = {
    margin: "0",
    width: "auto",
    backgroundColor: "#c04050"
};

const tabindex = -1;

class NavBar extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
    }

    onLogout() {
        loginService.logoutUser().then(() => {
            let { router } = this.context;
            router.replace("login");
        }).catch(error => {
            console.error(error);
            this.setState(error);
        });
    }

    myAccount() {
        let { router } = this.context;
        router.replace("my_account");
    }

    render() {
        const settingsMenu = <Menu>
            <MenuItem iconName="pt-icon-user"
                text="My account"
                onClick={this.myAccount.bind(this)}
            />
            <MenuDivider />
            <MenuItem text="Logout"
                iconName="pt-icon-log-out"
                onClick={this.onLogout.bind(this)}
            />
        </Menu>;

        let user = appState.getUser();
        let {name, surname} = user || {name: "",  surname: ""};

        return (
            <nav className="pt-navbar pt-dark" style={navbarStyle}>
                <div style={navbarStyle}>
                    <div className="pt-navbar-group pt-align-left">
                        <Link to="/dashboard">
                            <div className="pt-navbar-heading" style={{color: "white"}}>Turjeeman</div>
                        </Link>
                    </div>
                    <div className="pt-navbar-group pt-align-right">
                        <Link to="/dashboard">
                            <button className="pt-button pt-minimal pt-icon-home" tabIndex={tabindex}><span className="no-highlight">Dashboard</span></button>
                        </Link>
                        <span className="pt-navbar-divider" />
                        <button className="pt-button pt-minimal pt-icon-notifications" tabIndex={tabindex}/>
                        <span className="pt-navbar-divider" />
                        <Popover content={settingsMenu} position={Position.BOTTOM_RIGHT}>
                            <div>
                                <button className="pt-button pt-minimal pt-icon-cog" tabIndex={tabindex}>
                                    <span style={{fontSize: 14}}>{name + " " + surname}</span>
                                </button>
                            </div>
                        </Popover>

                    </div>
                </div>
            </nav>
        );
    }
}

NavBar.contextTypes = {
    router: PropTypes.object
};

export default NavBar;
