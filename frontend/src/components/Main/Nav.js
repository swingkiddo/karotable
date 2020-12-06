import React from 'react'
import UserMenu from './UserMenu'
import { useMediaQuery } from '@material-ui/core'

import './Main.scss'


const Nav = (props) => {
    const phoneScreen = useMediaQuery('(max-width:600px)')

    return (
      <div>
        {phoneScreen
            ?
            <div className="nav-mobile">
              <ul className="nav-menu-right">
                <li className="nav-menu-right-item">
                  <UserMenu />
                </li>
              </ul>
            </div>
            : 
            <div className="nav">
              <ul className="nav-menu-left">
                <li className="nav-menu-left-item">
                  <a href="/production">ПРОИЗВОДСТВО</a>
                </li>
                <li className="nav-menu-left-item">
                  <a href="/tasks">ЗАДАЧИ</a>
                </li>
                <li className="nav-menu-left-item">
                  <a href="/clients">КЛИЕНТЫ</a>
                </li>
              </ul>
            
              <ul className="nav-menu-right">
                <li className="nav-menu-right-item">
                  <UserMenu />
                </li>
              </ul>
            </div>
        }
      </div>        
    )
}

export default Nav;