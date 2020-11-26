import React, { useState } from 'react'

import { ITasksTableProps, ITaskItem } from '../../interfaces/TasksInterfaces'

import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

import { EditTaskModalTwo } from './EditTaskModal'


export const TasksTable = (props: ITasksTableProps) => {
    const [mountModal, setMountModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [taskForModal, setTaskForModal] = useState<ITaskItem | null>(null);

    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setMountModal(false)
        setShowModal(false)
    }

    const handleRowClick = (e: any, pk: number) => {
        const taskForModal = props.tasks.filter((task) => {
            return task.pk === pk
        });
        setMountModal(true);
        setTaskForModal(taskForModal[0]);
        openModal();
    }

    return (
        <Table className={"tasks-table"}>
            <TableHead>
                <TableRow>
                    <TableCell align={"center"}> <span>#</span> </TableCell>
                    <TableCell align={"center"}> <span>Клиент</span> </TableCell>
                    <TableCell align={"center"}> <span>Адрес</span> </TableCell>
                    <TableCell align={"center"}> <span>Задача</span> </TableCell>
                    <TableCell align={"center"}> <span>Менеджер</span> </TableCell>
                </TableRow>
                {mountModal
                ?   <EditTaskModalTwo 
                        task={taskForModal}
                        clients={props.clients} 
                        isOpen={showModal} 
                        onRequestClose={closeModal} />                 
                : null}

            </TableHead>
            <TableBody>
            {props.tasks.map((task, index) => 
                <TableRow key={task.pk} hover onClick={(e) => handleRowClick(e, task.pk) }>
                    <TableCell align={"center"}> <span>{index + 1}</span></TableCell>
                    <TableCell align={"center"}> <span>{task.client.name}</span> </TableCell>
                    <TableCell align={"center"}> <span>{task.client.address}</span> </TableCell>
                    <TableCell align={"center"}> <span>{task.description}</span> </TableCell>
                    <TableCell align={"center"}> <span>{task.manager}</span></TableCell>

                </TableRow>)}                        
            </TableBody>
        </Table>
    )
}

