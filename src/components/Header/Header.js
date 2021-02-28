import React from "react";

import "./Header.scss";

const Header = () => {
  return (
    <div className="app-header">
      <nav>
        <ul>
          <li>Homepage</li>
        </ul>
        <ul>
          <li>Posts</li>
        </ul>
        <ul>
          <li>Todos</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
