import React, { Component } from 'react'

import { TableBody, TableRow, TableCell, IconButton } from '@material-ui/core'
import { CheckCircle, Cancel } from '@material-ui/icons'

import TasksService from '../TasksService'

const tasksService = new TasksService();

const If = (props) => {
    const task = props.task;
    const user = props.user;
    if (!task.driver) {
        return <TableCell align={"center"}>
                    <IconButton onClick={(e) => props.acceptTask(e, task.pk)}> 
                        <CheckCircle /> 
                    </IconButton>
                </TableCell>
    } else if (task.driver && task.driver === user.name) {
        return <TableCell align={"center"}>
                    <IconButton onClick={(e) => props.cancelTask(e, task.pk)}>
                         <Cancel />
                    </IconButton>
                </TableCell>
    } else {
        return <TableCell align={"center"}><span>{task.driver}</span></TableCell>
    }

}

export default class DriverTable extends Component {
    constructor(props) {
        super(props);
    }

    acceptTask(e, pk) {
        const user = this.props.user;
        tasksService.updateTask(pk, {"driver": user.pk} );
    }

    cancelTask(e, pk) {
        tasksService.updateTask(pk, {"driver": null});
    }

    render() {
        return (
            <TableBody>
                {this.props.tasks.map((task, index) => 
                <TableRow key={task.pk}>
                    <TableCell align={"center"}> <span>{index + 1}</span></TableCell>
                    <TableCell align={"center"}> <span>{task.client.name}</span> </TableCell>
                    <TableCell align={"center"}> <span>{task.client.address}</span> </TableCell>
                    <TableCell align={"center"}> <span>{task.description}</span> </TableCell>
                    <TableCell align={"center"}> <span>{task.manager}</span></TableCell>
                </TableRow>)}                        
            </TableBody>
        )
    }
}