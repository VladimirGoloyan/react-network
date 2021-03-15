import React from 'react'

import './NavLink.scss'

import {NavLink as RouterNavLink} from 'react-router-dom' 
const NavLink = ({children, to}) => {
    return (
        <RouterNavLink exact to={to} className='app-nav-link' activeClassName="app-nav-link--active">
            {children}
        </RouterNavLink>
    )
}

export default NavLink
