import React from 'react'
import UserMenu from './UserMenu'

import './Main.scss'


export default function Nav(props) {

    return (
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
            <UserMenu logout={props.logout} />
          </li>
        </ul>

      </div>        
    )
}