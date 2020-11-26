import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'

import Nav from './components/Main/Nav'
import Tasks from './components/Tasks/Tasks'
import Login from './components/Login'
import LoginTwo from './components/Login'
import ManagerView from './components/Views/Managers/ManagerView'
import './App.scss';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: localStorage.getItem('token') ? true : false,
      username: '',
      currentUser: null,
      
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    if (this.state.loggedIn) {
      const url = 'http://192.168.1.31:8000/api/current-user/';
      axios.get(url, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}})
        .then(res => res.data)
        .then(data => {
          console.log(data);
          this.setState({
            username: data.username,
            currentUser: data.employee})
        })
    }
  }

  handleLogin = async (e, data) => {
    e.preventDefault();
    const url = 'http://192.168.1.31:8000/api/token/';
    await axios.post(url, data, {headers: {'Content-Type': 'application/json'}})
      .then(response => response.data)
      .then(data => {
        localStorage.setItem('token', data.access);
        this.setState({loggedIn: true})
      })
    window.location.replace("http://192.168.1.31:3000/tasks/")
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({loggedIn: false, username: '', currentUser: null});
    window.location.replace("http://192.168.1.31:3000/production/")
  };

  renderViewSwitch(position) {
    switch(position) {
      case 'Менеджер':
        return <ManagerView logout={this.handleLogout} currentUser={this.state.currentUser} />;
      case 'Водитель':
        return <ManagerView logout={this.handleLogout} currentUser={this.state.currentUser} />;
    }
  }

  render() {
    const currentUser = this.state.currentUser;
    let view;
    if (currentUser && currentUser.position){
      view = this.renderViewSwitch(currentUser.position)
    }
    return (
      this.state.loggedIn ?
      <BrowserRouter>
        {view}
      </BrowserRouter>

      : <Login handleLogin={this.handleLogin} />
    )
  }
}

export default App;