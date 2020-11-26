import React, { useState, useEffect } from 'react'
import { IClientsProps } from '../../interfaces/ClientsInterfaces'

import { Paper, Button } from '@material-ui/core'
import { DataGrid, ColDef } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/core/styles'
import ClientsService from './ClientsService';

const clientsService = new ClientsService();


const useStyles = makeStyles((theme: any) => ({
    wrapper: {
        padding: '0 2rem'
    },
    topPanel: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',

        "& button": {
            margin: theme.spacing(2),
        }
    }
}))


const columns: ColDef[] = [
    { field: 'pk', headerName: 'ID'},
    { field: 'name', headerName: 'Наименование' },
    { field: 'address', headerName: 'Адрес' },
    { field: 'phoneNumber', headerName: 'Телефон' },
    { field: 'email', headerName: 'Email' }
]

const Clients = (props: IClientsProps) => {
    const [clients, setClients] = useState([])
    const data = []

    const classes = useStyles()

    useEffect(() => {
        clientsService.getClients()
        .then(clients => setClients(clients.filter((c: any) => {
            return props.currentUser.clients.includes(c.pk)
        })));
    }, [])

    return (
        <div className={classes.wrapper}>
            <Paper elevation={3}>
                <div className={classes.topPanel}>
                    <Button variant="contained" color="primary">Добавить</Button>
                </div>
                <div>

                </div>

            </Paper>
        </div>
    )
}

export default Clients;