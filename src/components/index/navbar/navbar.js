import React, {PropTypes} from "react";
import { Link } from "react-router";
import { Popover, PopoverInteractionKind, Position, Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import * as Blueprint from "@blueprintjs/core";

import appState from "../../../utility/app_state";
import loginService from "../login/_services/login_service";

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
            let {router} = this.context;
            router.replace("login");
        }).catch(error => {
            logger.logError(error);
            this.setState(error);
        });
    }

    render() {
        const settingsMenu = <Menu>
            <MenuItem
                iconName="new-text-box"
                text="New text box"
            />
            <MenuItem
                iconName="new-object"
                text="New object"
            />
            <MenuItem
                iconName="new-link"
                text="New link"
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
                        <Link to="/">
                            <div className="pt-navbar-heading" style={{color: "white"}}>Turjeeman</div>
                        </Link>
                    </div>
                    <div className="pt-navbar-group pt-align-right">
                        <button className="pt-button pt-minimal pt-icon-home" tabIndex={tabindex}>Home</button>
                        <button className="pt-button pt-minimal pt-icon-document" tabIndex={tabindex}>Files</button>
                        <span className="pt-navbar-divider" />
                        <button className="pt-button pt-minimal pt-icon-user" tabIndex={tabindex}/>
                        <button className="pt-button pt-minimal pt-icon-notifications" tabIndex={tabindex}/>

                        <Popover content={settingsMenu} position={Position.BOTTOM_RIGHT}>
                            <div>
                                <span style={{fontSize: 14}}>{name + " " + surname}</span>
                                <button className="pt-button pt-minimal pt-icon-cog" tabIndex={tabindex}/>
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
