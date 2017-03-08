import React, {PropTypes} from "react";

import * as Blueprint from "@blueprintjs/core";

const navbarStyle = {
    margin: "0",
    width: "auto",
    backgroundColor: "#c04050"
};

class NavBar extends React.Component {
    render() {
        return (
            <nav className="pt-navbar pt-dark" style={navbarStyle}>
                <div style={navbarStyle}>
                    <div className="pt-navbar-group pt-align-left">
                        <div className="pt-navbar-heading">Turjeeman</div>
                    </div>
                    <div className="pt-navbar-group pt-align-right">
                        <button className="pt-button pt-minimal pt-icon-home">Home</button>
                        <button className="pt-button pt-minimal pt-icon-document">Files</button>
                        <span className="pt-navbar-divider" />
                        <button className="pt-button pt-minimal pt-icon-user" />
                        <button className="pt-button pt-minimal pt-icon-notifications" />
                        <button className="pt-button pt-minimal pt-icon-cog" />
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
