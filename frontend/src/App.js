import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Tasks from './components/Tasks'

import './App.scss';

const BaseLayout = () => (
  <div className="page">
    <div className="nav">
        <ul className="nav-menu">
          <li className="nav-menu-item">
            <a href="/production">ПРОИЗВОДСТВО</a>
          </li>
          <li className="nav-menu-item">
            <a href="/tasks">ЗАДАЧИ</a>
          </li>
        </ul>
        <div className="nav-sub-menu">
          <ul></ul>
        </div>
    </div>

    <div className="content">
      <Switch>  
        <Route path="/tasks">
          <Tasks />
        </Route>
        <Route path="/production">
            
        </Route>
      </Switch>

    </div>
  </div>
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <BaseLayout />
      </BrowserRouter>
    )
  }
}

export default App;