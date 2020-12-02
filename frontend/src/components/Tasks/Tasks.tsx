import React, { useState, useEffect } from 'react'
import { CreateTaskModal } from './CreateTaskModal'
import moment from 'moment'

import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import { Fab, Paper, IconButton, Icon } from "@material-ui/core"
import { Add, ArrowLeft, ArrowRight } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import { ITasksProps } from '../../interfaces/TasksInterfaces'

import TasksService from '../../services/TasksService'
import { TasksTable } from './TasksTable'
import './Tasks.scss'

const tasksService = new TasksService();

const useStyles = makeStyles((theme: any) => ({
    paper: {
        paddingTop: '0'
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
    console.log(moment().format("MM-DD-YYYY"))
    console.log(moment().day(1).format("MM-DD-YYYY"))

    return (
        <div className="wrapper">
        <Paper 
            elevation={3}
            className={classes.paper}>

            <div className="tasks-top-panel">
                <div className="tasks-top-panel-header">
                    <span> Задачи </span>
                </div>
                <div className="tasks-top-panel-date-picker">
                    <IconButton onClick={(e) => setDate(new Date(new Date().setDate(new Date(date).getDate() - 1)).toDateString())}>
                        <ArrowLeft />
                    </IconButton>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker value={date} onChange={changeDateHandler} format="d MMM yyyy" />
                    </MuiPickersUtilsProvider>
                    <IconButton >
                        <ArrowRight onClick={(e) => setDate(new Date(new Date().setDate(new Date(date).getDate() + 1)).toDateString())}/>
                    </IconButton>
                </div>
            </div>
        </Paper>
        <Paper>
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