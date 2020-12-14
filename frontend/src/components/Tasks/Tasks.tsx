import React, { useState, useEffect } from 'react'
import { CreateTaskModal } from './CreateTaskModal'
import CommonDatePicker from '../Common/CommonDatePicker'
import moment from 'moment'


import { Fab, Paper} from "@material-ui/core"
import { Add } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import { ITasksProps } from '../../interfaces/TasksInterfaces'

import TasksService from '../../services/TasksService'
import ClientsService from '../../services/ClientsService'
import { TasksTable } from './TasksTable'
import './Tasks.scss'

const tasksService = new TasksService();
const clientsService = new ClientsService()

const useStyles = makeStyles((theme: any) => ({
    paper: {
        paddingTop: '0'
    }
}))


const Tasks = (props: ITasksProps) => {
    const [allTasks, setAllTasks] = useState([])
    const [currentTasks, setCurrentTasks] = useState([])
    const [clients, setClients] = useState([])
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"))
    const [showModal, setShowModal] = useState(false)

    const classes = useStyles()

    const changeDateHandler = (date: any) => {
        setDate(moment(date).format("YYYY-MM-DD"))
    }

    /* when component did mount, get data from API */
    useEffect(() => {
        tasksService.getTasks().then((tasks: any) => {
            setAllTasks(tasks);
            setCurrentTasks(tasks.filter((task: any) => {
                return moment(task.date).format("YYYY-MM-DD") === date;
            }));
        });
        clientsService.getClients().then((clients: any) => {
            setClients(clients)
        });
    }, [])


    /* when user changes the date, update the table with matching tasks */
    useEffect(() => {
        setCurrentTasks(allTasks.filter((task: any) => {
            return moment(task.date).format("YYYY-MM-DD") === date
        }))
    }, [date]);

    return (
        <div className="wrapper">
        <Paper 
            elevation={3}
            className={classes.paper}>

            <div className="tasks-top-panel">
                <div className="tasks-top-panel-header">
                    <span> Задачи </span>
                </div>
                <CommonDatePicker date={date} setDate={setDate} />
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

export  default Tasks 