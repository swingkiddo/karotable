import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Tasks from '../Tasks/Tasks'
import Clients from '../Clients/Clients'
import Logistics from '../Logistics/Logistics'


import { IContentProps } from '../../interfaces/CommonInterfaces'
import './Main.scss'

const Content = (props: IContentProps) => {

    return (
          <div className="content">
            <Switch>  

              <Route path="/tasks">
                <Tasks currentUser={props.user} clients={props.clients}/>
              </Route>
              <Route path="/production">
                  
              </Route>
              <Route path="/login">

              </Route>
              <Route path="/clients">
                <Clients user={props.user} clients={props.clients} />
              </Route>
              <Route path="/logistics">
                <Logistics user={props.user} clients={props.clients} phoneScreen={props.phoneScreen}/>
              </Route>
            </Switch>
          </div>
    )
}

export default Content;