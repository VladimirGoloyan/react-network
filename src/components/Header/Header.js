import React from "react";

import NavLink from "../NavLink/NavLink"

import "./Header.scss";
const routerLinks = [
  {
    title: "Homepage",
    to: "/",
  },
  {
    title: "Posts",
    to: "/posts",
  },
  {
    title: "Todos",
    to: "/todos",
  },
  {
    title: "Auth",
    to: "/auth",
  },
];

const Header = () => {
  return (
    <div className="app-header">
      <nav>
        <ul className="app-header__nav-list">
          {routerLinks.map((el,idx) => (
            <li key={idx} className="app-header__nav-list__item">
              <NavLink className="app-header__nav-list__item__link" to={el.to}>
                {el.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
