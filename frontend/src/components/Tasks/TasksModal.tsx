import React, { Component } from 'react'
import Modal from 'react-modal'
import { FormControl,
         InputLabel,
         TextField,
         Select,
         TextareaAutosize,
         Button } from '@material-ui/core' 

import { ITasksModalProps } from './TasksInterfaces'

interface IState {}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '25vw',
        height: '35%'
    }
}

export default class TasksModal extends Component<ITasksModalProps, IState> {
    constructor(props: ITasksModalProps) {
        super(props)
    }

    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onRequestClose}
                style={customStyles}
                contentLabel="Добавить задачу">
                <form className="task-form">
                    <div className="task-form-inputs">

                        <FormControl>
                            <InputLabel htmlFor="client-input">Клиент</InputLabel>
                            <Select id="task-client" 
                                    native
                                    labelId="task-client-label" 
                                    onChange={this.props.onChange} 
                                    
                                    inputProps={{
                                        name: "clientFormValue",
                                        id: "client-input"
                                    }}> 
                                    <option value=""></option>
                                {this.props.clients.map(client =>
                                    <option value={client.pk}> {client.name} </option>)}
                            </Select>
                        </FormControl>

                        <TextField id="task-date"
                                    type="date" 
                                    placeholder="Дата" 
                                    onChange={this.props.onChange}
                                    inputProps = {{
                                        name: "dateFormValue"
                                    }} />
                        <TextareaAutosize 
                            rowsMax={5} 
                            rowsMin={5} 
                            placeholder="Задача" 
                            onChange={this.props.onChange}
                            name="descriptionFormValue"
                             />
                    </div>
                    <div className="task-form-buttons">
                        <Button variant="outlined" color="primary" onClick={this.props.handleSubmit}>Добавить</Button>
                    </div>
                </form>
            </Modal>
        )
    }
}