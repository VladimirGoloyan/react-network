import React, { useContext } from "react";
import { AppContext } from "../../App";

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
      <nav>
        <ul className="app-header__nav-list">
          {routerLinks.map((el, idx) => (
            <li key={idx} className="app-header__nav-list__item">
              <NavLink className="app-header__nav-list__item__link" to={el.to}>
                {el.title}
              </NavLink>
            </li>
          ))}
      {!context.user ? (
        <li className="app-header__nav-list__item">
          <NavLink className="app-header__nav-list__item__link" to={"/auth"}>
            Auth
          </NavLink>
        </li>
      ) : (
        <li className="app-header__nav-list__item">
          <NavLink className="app-header__nav-list__item__link" to={"/profile"}>
            Profile
          </NavLink>
        </li>
      )}
      </ul>
    </nav>
    </div>
  );
};

export default Header;
