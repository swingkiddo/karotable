import React, { useState } from 'react'

import Modal from 'react-modal'
import { FormControl,
         InputLabel,
         TextField,
         Select,
         TextareaAutosize,
         Button } from '@material-ui/core' 
import { makeStyles } from "@material-ui/core/styles" 


import { ITasksModalProps } from '../../interfaces/TasksInterfaces'
import TasksService from '../../services/TasksService'

const tasksService = new TasksService();


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

const useStyles = makeStyles((theme: any) => ({
    root: {
        width: "100%",
        "& label": {
            marginLeft: "3rem"
        }
    },
     input: {
        width: "80%",
        height: "50%",
        margin: "0 auto"
     },
     textarea: {
         padding: ".5rem"
     }
}))

const CreateTaskModal = (props: ITasksModalProps) => {
    const [clientValue, setClientValue] = useState<unknown | null>(null)
    const [dateValue, setDateValue] = useState('')
    const [descriptionValue, setDescriptionValue] = useState('')

    const handleSubmit = (e: any) => {
        tasksService.createTask({
            "client": clientValue,
            "date": dateValue,
            "description": descriptionValue,
            "manager": props.currentUser.pk
        }).then(result => alert("Задача добавлена"))
        .catch(() => alert("Произошла ошибка"));
        props.onRequestClose();
    }

    const classes = useStyles();

    return (
        <Modal 
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            style={customStyles}
            contentLabel="Добавить задачу">

            <form className="task-form">
                <div className="task-form-inputs">

                    <FormControl className={classes.root}>
                        <InputLabel htmlFor="client-input">Клиент</InputLabel>
                        <Select 
                            className={classes.input}
                            id="task-client" 
                            native
                            labelId="task-client-label" 
                            onChange={(e) => setClientValue(e.currentTarget.value)}  
                            inputProps={{
                                name: "clientFormValue",
                                id: "client-input"
                            }}> 
                            <option value=""></option>
                        {props.clients.map(client =>
                            <option value={client.pk}> {client.name} </option>)}
                        </Select>
                    </FormControl>

                    <TextField 
                        className={classes.input}
                        id="task-date"
                        type="date" 
                        placeholder="Дата" 
                        onChange={(e) => setDateValue(e.currentTarget.value)}
                        inputProps = {{
                            name: "dateFormValue"
                        }} />

                    <TextareaAutosize
                        className={classes.textarea} 
                        rowsMax={5} 
                        rowsMin={5} 
                        placeholder="Задача" 
                        onChange={(e) => setDescriptionValue(e.currentTarget.value)}
                        name="descriptionFormValue"
                        />

                </div>
                <div className="task-form-buttons">
                    <Button variant="outlined" color="primary" onClick={handleSubmit}>Добавить</Button>
                </div>
            </form>
        </Modal>
    )
}

export { CreateTaskModal }