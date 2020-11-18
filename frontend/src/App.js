import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'

import Tasks from './components/Tasks/Tasks'
import Login from './Login'

import './App.scss';
import { ThumbDownSharp } from '@material-ui/icons'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: localStorage.getItem('token') ? true : false,
      username: '',
      position: null 
    }

    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    if (this.state.loggedIn) {
      const url = 'http://localhost:8000/api/current-user/';
      axios.get(url, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}})
        .then(res => res.data)
        .then(data => {
          console.log(data);
          this.setState({
            username: data.username,
            position: data.employee.position})
        })
    }
  }

  handleLogin = async (e, data) => {
    e.preventDefault();
    const url = 'http://localhost:8000/api/token/';
    await axios.post(url, data, {headers: {'Content-Type': 'application/json'}})
      .then(response => response.data)
      .then(data => {
        localStorage.setItem('token', data.access);
        this.setState({loggedIn: true})
      })
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({loggedIn: false, username: ''});
  };

  render() {
    return (
      this.state.loggedIn ?
      <BrowserRouter>
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
                  <ul>
                    <li className="nav-sub-menu-item">
                    </li>
                    <div className="nav-sub-menu-item">

                    </div>
                  </ul>

                </div>
            </div>

            <div className="content">
              <Switch>  
                <Route path="/tasks">
                  <Tasks />
                </Route>
                <Route path="/production">
                    
                </Route>
                <Route path="/login">

                </Route>
              </Switch>

            </div>
          </div>
        <button onClick={this.handleLogout}>Logout</button>
      </BrowserRouter>

      : <Login handleLogin={this.handleLogin} />
    )
  }
}

export default App;