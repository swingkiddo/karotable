import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Nav from '../../Main/Nav'
import { Tasks } from '../../Tasks/Tasks'
import Clients from '../../Clients/Clients'


const ManagerView = (props) => {

    return (
        <div className="page">
          <Nav logout={props.handleLogout}/>

          <div className="content">
            <Switch>  

              <Route path="/tasks">
                <Tasks currentUser={props.currentUser} />
              </Route>
              <Route path="/production">
                  
              </Route>
              <Route path="/login">

              </Route>
              <Route path="/clients">
                <Clients currentUser={props.currentUser} />
              </Route>
            </Switch>
          </div>
          
        </div>
    )
}

export default ManagerView;