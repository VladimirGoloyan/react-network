import React from "react";

import "./Layout.scss";

const Layout = ({ children }) => {
    return (
        <div className="app-layout">
            <div className="app-layout__main">
                {children}
            </div>
        </div>
    )
}

export default Layout;
