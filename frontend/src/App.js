
import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Authentication from './services/AuthenticationService'
import ClientsService from './services/ClientsService'

import Nav from './components/Main/Nav'
import Content from './components/Main/Content'
import Login from './components/Main/Login'
import './App.scss';

const authentication = new Authentication();
const clientsService = new ClientsService();

export const App = (props) => {
  const [loggedIn, setLoggedIn] = useState(authentication.checkToken()) 
  const [user, setUser] = useState({})
  const [clients, setClients] = useState(clientsService.getClients()) 

  /* getting clients and user  when App component did mount*/
  useEffect(() => {
    clientsService.getClients()
    .then(data => setClients(data));

    authentication.getUser().then(user => setUser(user))
  }, [loggedIn])
  
  return (
    <BrowserRouter>
      { loggedIn 
          ? <div className="root">
              <Nav />
              <Content user={user.employee} clients={clients} />
            </div>

          : <Login /> }
    </BrowserRouter>

  )
}
