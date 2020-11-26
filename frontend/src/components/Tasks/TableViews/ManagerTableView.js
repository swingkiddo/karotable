import React, { Component } from 'react'

import { TableBody, TableRow, TableCell, IconButton } from '@material-ui/core'
import { CheckCircle, Cancel } from '@material-ui/icons'

export default class ManagerTable extends Component {
    constructor(props) {
        super(props);
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