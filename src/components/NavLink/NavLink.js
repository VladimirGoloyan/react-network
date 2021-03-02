import React from 'react'

import './NavLink.scss'

import {NavLink as RouterNavLink} from 'react-router-dom' 
const NavLink = ({children, to, className }) => {
    return (
        <RouterNavLink exact to={to} className={className} activeClassName="app-nav-link--active">
            {children}
        </RouterNavLink>
    )
}

export default NavLink
