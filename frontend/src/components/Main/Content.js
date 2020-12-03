import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Tasks from '../Tasks/Tasks'
import Clients from '../Clients/Clients'

import './Main.scss'

const Content = (props) => {

    return (
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
    )
}

export default Content;