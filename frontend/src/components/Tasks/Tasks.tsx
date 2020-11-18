import React, { Component } from 'react'
import TasksModal from './TasksModal'

import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import { Fab } from "@material-ui/core"
import { Add } from '@material-ui/icons'

import { IProps, IState, IEmployee } from './TasksInterfaces'

import TasksService from './TasksService'
import TasksTable from './TasksTable'
import './Tasks.scss'

const tasksService = new TasksService();


export default class Tasks extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            all_tasks: [],
            current_tasks: [],
            employees: {} as IEmployee,
            clients: [],
            date: new Date().toDateString(),
            showModal: false,
            clientFormValue: null,
            dateFormValue: null,
            descriptionFormValue: null
        };
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTaskFormChange = this.handleTaskFormChange.bind(this);
    }

    async componentDidMount() {
        await tasksService.getTasks().then((result) => {
            this.setState({all_tasks: result});
        });
        await tasksService.getEmployees().then((result) => {
            this.setState({employees: result})
        });
        await tasksService.getClients().then((result) => {
            this.setState({clients: result})
        });

        var act_tasks = this.state.all_tasks.filter((task) => {
            return new Date(task.task_date).toDateString() === this.state.date;
        });
        this.setState({current_tasks: act_tasks});        
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.state.date !== prevState.date) {
            var act_tasks = this.state.all_tasks.filter((task) => {
                return new Date(task.task_date).toDateString() === this.state.date;
            })
            this.setState({current_tasks: act_tasks});     
        }
    }
    
    changeDateHandler(date: any) {
        this.setState({date: new Date(date).toDateString()});
    }

    openModal() {
        this.setState({showModal: true})
    }

    closeModal() {
        this.setState({showModal: false})
    }

    handleSubmit(e: any) {
        tasksService.createTask({
            "client": this.state.clientFormValue,
            "task_date": this.state.dateFormValue,
            "description": this.state.descriptionFormValue
        }).then(result => alert("Задача добавлена")).catch(() => alert("Произошла ошибка"));
        this.closeModal();
    }

    handleTaskFormChange(e: any) {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        this.setState({
            ...this.state,
            [name]: value
        });
    }

    public render() {
        const tasks = this.state.current_tasks;
        const task_date = this.state.date;
        const clients = this.state.clients;

        return (
            <div className="wrapper">

                <div className="date-picker">
                    <div className="date-picker-input">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker value={task_date} onChange={this.changeDateHandler} format="d MMM yyyy" />
                        </MuiPickersUtilsProvider>
                    </div>
                </div>

                <TasksTable tasks={tasks} />

                <div className="add-task-button">
                    <Fab color="primary" onClick={this.openModal}>
                        <Add />
                    </Fab>

                    <TasksModal 
                        isOpen={this.state.showModal}
                        onRequestClose={this.closeModal}
                        onChange={this.handleTaskFormChange}
                        clients={clients}
                        handleSubmit={this.handleSubmit} />
                </div>

            </div>
        )
    }
}