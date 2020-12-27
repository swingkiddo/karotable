import React, { useState, useEffect, Fragment } from 'react'
import Modal from 'react-modal'

import { IClient } from '../../interfaces/CommonInterfaces'
import { ILogisticsModalProps } from '../../interfaces/LosisticsInterfaces'
import {
    FormControl,
    TextField,
    TextareaAutosize,
    Select,
    Button,
    InputLabel,
    makeStyles
} from '@material-ui/core'

import moment from 'moment'
import MomentUtils from '@date-io/moment'
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import "moment/locale/ru"
moment.locale("ru")


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
    form: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',

        '& textarea': {
            padding: theme.spacing(1)
        }
    },
    datePicker: {
        '& input': {
            paddingLeft: theme.spacing(2)
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',

        '& button': {
            marginLeft: theme.spacing(2)
        }
    }
}))
const LogisticsModal = (props: ILogisticsModalProps) => {
    const point = props.point
    const user = props.user
    const classes = useStyles()

    const [pk, setPK] = useState(0)
    const [client, setClient] = useState<number | unknown>(0)
    const [date, setDate] = useState<any>(moment().format("YYYY-MM-DD"))
    const [description, setDescription] = useState('')

    const data = {
        "client": client,
        "date": date,
        "description": description,
        "manager": user?.pk
    }

    const changeDateHandler = (date: any) => {
        setDate(moment(date.toDate()).format("YYYY-MM-DD"))
    }

    useEffect(() => {
        if (point && point !== undefined) {
            setPK(point.pk)
            setClient(point.client.pk)
            setDate(point.date)
            setDescription(point.description)
        }
    }, [point])

    return (
        <Modal
        isOpen={props.showModal}
        style={customStyles}
        onRequestClose={props.closeModal}>

            <FormControl className={classes.form}>
                <InputLabel htmlFor="client-input">Клиент</InputLabel>
                <Select
                value={client}
                onChange={(e) => { setClient(e.currentTarget.value) }}
                inputProps={{ id: "client-input" }}
                variant="standard"
                    
                >
                    <option value=""></option>
                    {
                        props.clients.map(client =>
                            <option value={client.pk}>{client.name}</option>)
                    }
                </Select>

                <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment} locale="ru">
                    <DatePicker
                    value={date}
                    onChange={date => changeDateHandler(date)}
                    format="D MMM yyyy"
                    className={classes.datePicker}
                    />
                </MuiPickersUtilsProvider>

                <TextareaAutosize
                onChange={(e) => setDescription(e.currentTarget.value)}
                value={description}
                rowsMax={5}
                rowsMin={5}
                placeholder="Задача"
                />

                <div className={classes.buttons}>
                    {
                        props.point && props.point !== undefined
                            ? <Fragment>
                                <Button
                                variant="outlined"
                                color="primary"
                                onClick={(e) => props.updatePoint(e, pk, data)}
                                >
                                    Изменить
                                </Button>

                                <Button
                                variant="contained"
                                color="secondary"
                                onClick={(e) => { props.deletePoint(e, pk); props.closeModal() }}
                                >
                                    Удалить
                                </Button>
                            </Fragment>

                            

                            : <Button
                                variant="outlined"
                                color="primary"
                                onClick={(e) => props.createPoint(e, data)}
                            >
                                Добавить
                            </Button>
                    }

                </div>

            </FormControl>

        </Modal>
    )
}

export default LogisticsModal