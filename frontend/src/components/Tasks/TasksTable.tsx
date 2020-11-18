import React, { Component } from 'react'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'
import { ITaskItem } from './TasksInterfaces'

interface IProps{
    tasks: Array<ITaskItem>
}
interface IState {}

export default class TasksTable extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props)
    }

    render() {
        const tasks = this.props.tasks;
        
        return (
            <Table className={"tasks-table"}>
            <TableHead>
                <TableRow>
                    <TableCell align={"center"}> <span>#</span> </TableCell>
                    <TableCell align={"center"}> <span>Клиент</span> </TableCell>
                    <TableCell align={"center"}> <span>Адрес</span> </TableCell>
                    <TableCell align={"center"}> <span>Задача</span> </TableCell>
                    <TableCell align={"center"}> <span>Водитель</span> </TableCell>
                    <TableCell align={"center"}> <span>Менеджер</span> </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {tasks && tasks !== undefined ? tasks.map((task, index) => 
                <TableRow key={task.pk}>
                    <TableCell align={"center"}> <span>{index + 1}</span></TableCell>
                    <TableCell align={"center"}> <span>{task.client.name}</span> </TableCell>
                    <TableCell align={"center"}> <span>{task.client.address}</span> </TableCell>
                    <TableCell align={"center"}> <span>{task.description}</span> </TableCell>
                    <TableCell align={"center"}> <span>{task.driver}</span> </TableCell>
                    <TableCell align={"center"}> <span>{task.manager}</span></TableCell>
                </TableRow>)                        
                : null }
            </TableBody>
        </Table>
        )
    }
}