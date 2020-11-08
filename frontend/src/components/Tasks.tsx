import React, { Component } from 'react'
import Modal from 'react-modal'

import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import { Fab, Button, TextField, Select } from '@material-ui/core' 
import { Add } from '@material-ui/icons'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

import { IProps, IState, IEmployee } from './TasksInterfaces'

import TasksService from './TasksService'
import './Tasks.scss'
import { nb } from 'date-fns/locale'

const tasksService = new TasksService();

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '35vw',
        height: '45%'
    }
}


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
            managerFormValue: null,
            driverFormValue: null,
            dateFormValue: null,
            descriptionFormValue: null
        };
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClientChange = this.handleClientChange.bind(this);
        this.handleManagerChange = this.handleManagerChange.bind(this);
        this.handleDriverChange = this.handleDriverChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

    }

    clientRef = React.createRef<HTMLInputElement>();
    managerRef = React.createRef<HTMLInputElement>();
    driverRef = React.createRef<HTMLInputElement>();
    dateRef = React.createRef<HTMLInputElement>();
    descriptionRef = React.createRef<HTMLInputElement>();

    public async componentDidMount() {
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
        /*var formData = new FormData();
        formData.append("client", this.state.clientFormValue!);
        formData.append("manager", this.state.managerFormValue!);
        formData.append("driver", this.state.driverFormValue!);
        formData.append("description", this.state.descriptionFormValue!);
        console.log(formData.get("manager"));*/

        tasksService.createTask({
            "client": this.state.clientFormValue,
            "manager": this.state.managerFormValue,
            "driver": this.state.driverFormValue,
            "description": this.state.descriptionFormValue
        }).then(result => alert("Задача добавлена")).catch(() => alert("Произошла ошибка"));
        this.closeModal();
    }

    handleClientChange(event: any) {
        this.setState({clientFormValue: event.target.value});
    }
    
    handleManagerChange(event: any) {
        this.setState({managerFormValue: event.target.value});
    }

    handleDriverChange(event: any) {
        this.setState({driverFormValue: event.target.value});
    }

    handleDescriptionChange(event: any) {
        this.setState({descriptionFormValue: event.target.value});
    }
    

    public render() {
        const tasks = this.state.current_tasks;
        const task_date = this.state.date;
        const clients = this.state.clients;
        const managers = this.state.employees.managers;
        const drivers = this.state.employees.drivers;

        return (
            <div className="wrapper">

                <div className="date-picker">
                    <div className="date-picker-input">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker value={task_date} onChange={this.changeDateHandler} />
                        </MuiPickersUtilsProvider>
                    </div>
                </div>

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

                <div className="add-task-button">
                    <Fab color="primary" onClick={this.openModal}>
                        <Add />
                    </Fab>
                    <Modal 
                        isOpen={this.state.showModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Добавить задачу">
                        <form className="task-form">
                            <div className="task-form-inputs">
                                <Select id="task-client" labelId="task-client-label" onChange={this.handleClientChange}>
                                        <option aria-label="None" value='' />    
                                    {clients.map(client =>
                                        <option value={client.pk}> {client.name} </option>)}
                                </Select>
                                <Select id="task-manager" labelId="task-manager-label" onChange={this.handleManagerChange}>
                                        <option aria-label="None" value='' />
                                    {managers && managers !== undefined ? managers.map(manager => 
                                        <option value={manager.pk}> {manager.name} </option>)
                                            : null}  
                                </Select>
                                <Select id="task-driver" labelId="task-driver-label" onChange={this.handleDriverChange}>
                                        <option aria-label="None" value='' ></option> 
                                    {drivers && drivers !== undefined ? drivers.map(driver => 
                                        <option value={driver.pk}> {driver.name} </option>)
                                            : null}  
                                </Select>

                                <TextField id="task-date" label="Дата" inputRef={this.dateRef}/>
                                <TextField id="task-description" label="Задача" inputRef={this.descriptionRef} onChange={this.handleDescriptionChange}/>
                            </div>
                            <div className="task-form-buttons">
                                <Button variant="outlined" color="primary" onClick={this.handleSubmit}>Добавить</Button>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>
        )
    }
}