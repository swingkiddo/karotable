import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Nav from '../../Main/Nav'
import { Tasks } from '../../Tasks/Tasks'
import Clients from '../../Clients/Clients'

import Authentication from '../../../services/AuthenticationService'
const authentication = new Authentication()

const ManagerView = (props) => {

    return (
        <div className="page">
          <Nav logout={authentication.logout}/>

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
                <Clients user={props.user} clients={props.clients} />
              </Route>
            </Switch>
          </div>
          
        </div>
    )
}

export default ManagerView;