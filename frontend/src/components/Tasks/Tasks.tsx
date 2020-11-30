import React, { useState, useEffect } from 'react'
import { CreateTaskModal } from './CreateTaskModal'

import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import { Fab, Paper } from "@material-ui/core"
import { Add } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import { ITasksProps } from '../../interfaces/TasksInterfaces'

import TasksService from '../../services/TasksService'
import { TasksTable } from './TasksTable'
import './Tasks.scss'

const tasksService = new TasksService();

const useStyles = makeStyles((theme: any) => ({
    paper: {
        paddingTop: theme.spacing(2)
    }
}))


const Tasks = (props: ITasksProps) => {
    const [allTasks, setAllTasks] = useState([])
    const [currentTasks, setCurrentTasks] = useState([])
    const [clients, setClients] = useState([])
    const [date, setDate] = useState(new Date().toDateString())
    const [showModal, setShowModal] = useState(false)

    const classes = useStyles()

    const changeDateHandler = (date: any) => {
        setDate(new Date(date).toDateString())
    }

    /* when component did mount, get data from API */
    useEffect(() => {
        tasksService.getTasks().then((tasks: any) => {
            setAllTasks(tasks);
            setCurrentTasks(tasks.filter((task: any) => {
                return new Date(task.date).toDateString() === date;
            }));
        });
        tasksService.getClients().then((clients: any) => {
            setClients(clients)
        });
    }, [])


    /* when user changes the date, update the table with matching tasks */
    useEffect(() => {
        setCurrentTasks(allTasks.filter((task: any) => {
            return new Date(task.date).toDateString() === date
        }))
    }, [date]);



    return (
        <div className="wrapper">
        <Paper 
            elevation={3}
            className={classes.paper}>

            <div className="date-picker">
                <div className="date-picker-input">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker value={date} onChange={changeDateHandler} format="d MMM yyyy" />
                    </MuiPickersUtilsProvider>
                </div>
            </div>

            <TasksTable 
                tasks={currentTasks}
                clients={clients}
                currentUser={props.currentUser} />

            <div className="add-task-button">
                <Fab color="primary" onClick={() => setShowModal(true)}>
                    <Add />
                </Fab>

                <CreateTaskModal 
                    isOpen={showModal}
                    onRequestClose={() => setShowModal(false)}
                    clients={clients}
                    currentUser={props.currentUser} />
            </div>

        </Paper>
        </div>
    )
}

export  { Tasks }