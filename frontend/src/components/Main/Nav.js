import React from 'react'
import UserMenu from './UserMenu'

import './Main.scss'


const Nav = (props) => {


    return (
      <div>
        {props.phoneScreen
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
                  <li className="nav-menu-left-item">
                    <a href="/logistics">ЛОГИСТИКА</a>
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