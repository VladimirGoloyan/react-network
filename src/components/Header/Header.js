import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";

const Header = () => {
  return (
    <div className="app-header">
      <nav>
        <ul className="app-header__nav-list">
          <li className="app-header__nav-list__item">
            <Link className="app-header__nav-list__item__link" to="/">Homepage</Link>
          </li>
          <li className="app-header__nav-list__item">
            <Link className="app-header__nav-list__item__link" to="/posts">Posts</Link>
          </li>
          <li className="app-header__nav-list__item">
            <Link className="app-header__nav-list__item__link" to="/todos">Todos</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
