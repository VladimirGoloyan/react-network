import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import NavLink from "../NavLink/NavLink";

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
];

const Header = () => {
  const context = useContext(AppContext);
  return (
    <div className="app-header">
      <ul className="app-header__nav-list">
        {routerLinks.map((el, idx) => (
          <li key={idx} className="app-header__nav-list__item">
            <NavLink to={el.to}>{el.title}</NavLink>
          </li>
        ))}
        {!context.state.user ? (
          <li className="app-header__nav-list__item">
            <NavLink to={"/auth"}>Authentication</NavLink>
          </li>
        ) : (
          <li className="app-header__nav-list__item">
            <NavLink to={"/profile"}>Profile</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
