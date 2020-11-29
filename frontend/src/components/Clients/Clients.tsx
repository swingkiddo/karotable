import React, { useState, useEffect } from 'react'
import { IClientsProps } from '../../interfaces/ClientsInterfaces'

import { Paper, Button } from '@material-ui/core'
import { DataGrid, ColDef, RowsProp } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/core/styles'
import ClientsService from './ClientsService';

const clientsService = new ClientsService();


const useStyles = makeStyles((theme: any) => ({
    wrapper: {
        padding: '0 2rem',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        fontSize: '1.5rem'
    },
    topPanel: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',

        "& button": {
            margin: theme.spacing(3),
        }
    },
    tableWrapper: {
        height: '20rem'
    },
    tableHeader: {
        marginLeft: theme.spacing(3),
        display: 'flex',
        alignItems: 'center'
    }
}))


const columns: ColDef[] = [
    { field: 'pk', headerName: '#', type: 'number' },
    { field: 'name', headerName: 'Наименование', flex: .5 },
    { field: 'address', headerName: 'Адрес', flex: 1 },
    { field: 'phoneNumber', headerName: 'Телефон', width: 200 },
    { field: 'email', headerName: 'Email', flex: 1 }
]


const Clients = (props: IClientsProps) => {
    const [clients, setClients] = useState([])
    clients.forEach((client: any, index: number) => {
        client.id = index;
        client.pk = index + 1;
        delete client['manager']
    })
    console.log(clients)

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
                    <span className={classes.tableHeader}>Клиенты</span>
                    <Button variant="contained" color="primary">Добавить</Button>
                </div>
                <div className={classes.tableWrapper}>
                    <DataGrid autoHeight={true} columns={columns} rows={clients} hideFooter={true} />
                </div>

            </Paper>

        </div>
    )
}

export default Clients;