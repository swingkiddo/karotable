import React, { useState } from 'react'
import Modal from 'react-modal'
import { FormControl,
    InputLabel,
    TextField,
    Select,
    TextareaAutosize,
    Button } from '@material-ui/core' 
import { makeStyles } from '@material-ui/core/styles' 

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

const useStyles = makeStyles((theme) => ({
    button: {
        marginLeft: theme.spacing(2)
    },
    input: {
        width: "80%",
        margin: "0 auto"
    }
}))

export const EditTaskModalTwo = (props) => {
    const [clientValue, setClientValue] = useState(props.task.client.pk)
    const [dateValue, setDateValue] = useState(props.task.date)
    const [descriptionValue, setDescriptionValue] = useState(props.task.description)
    const classes = useStyles()

    const handleSubmit = (e, pk) => {
        const data = {
            "client": clientValue,
            "date": dateValue,
            "description": descriptionValue
        };
        tasksService.updateTask(pk, data)
        .then(result => alert("Задача изменена"))
        .catch(e => alert("Произошла ошибка"));

        props.onRequestClose();
        document.location.reload();
    }

    const handleDelete = (e, pk) => {
        tasksService.deleteTask(pk)
        .then(result => alert("Задача удалена"))
        .catch(e => alert("Произошла ошибка"))

        props.onRequestClose()
        document.location.reload()
    }

    return (
        <Modal
            style={customStyles}
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            contentLabel="Изменить задачу"
        >
            <form className="task-form">
                <div className="task-form-inputs">

                    <FormControl className={classes.input}>
                        <InputLabel htmlFor="client-input">Клиент</InputLabel>
                        <Select 
                            id="task-client" 
                            native
                            labelId="task-client-label" 
                            onChange={(e) => {setClientValue(e.currentTarget.value)}} 
                            defaultValue={clientValue}
                            inputProps={{
                                name: "clientFormValue",
                                id: "client-input"
                            }} > 

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
                        onChange={(e) => {setDateValue(e.currentTarget.value)}}
                        defaultValue={dateValue}
                        inputProps = {{
                            name: "dateFormValue"
                        }} />

                    <TextareaAutosize 
                        rowsMax={5} 
                        rowsMin={5} 
                        placeholder="Задача" 
                        onChange={(e) => {setDescriptionValue(e.target.value)}}
                        name="descriptionFormValue"
                        defaultValue={descriptionValue}
                        />
                </div>
                <div className="task-form-buttons">
                    <Button 
                        className={classes.button}
                        variant="outlined" 
                        color="primary" 
                        onClick={(e) => handleSubmit(e, props.task.pk)}>
                    Изменить
                    </Button>

                    <Button 
                        className={classes.button} 
                        variant="contained" 
                        color="secondary"
                        onClick={(e) => handleDelete(e, props.task.pk)}>
                    Удалить
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
