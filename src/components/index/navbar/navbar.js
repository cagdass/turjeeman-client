import React, {PropTypes} from "react";
import { Link } from "react-router";

import * as Blueprint from "@blueprintjs/core";

const navbarStyle = {
    margin: "0",
    width: "auto",
    backgroundColor: "#c04050"
};

const tabindex = -1;

class NavBar extends React.Component {
    render() {
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
                        <button className="pt-button pt-minimal pt-icon-cog" tabIndex={tabindex}/>
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
