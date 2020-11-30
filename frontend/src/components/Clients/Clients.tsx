import React, { useState, useEffect } from 'react'
import { IClientsProps } from '../../interfaces/ClientsInterfaces'
import { IClient } from '../../interfaces/CommonInterfaces'

import { Paper, Button } from '@material-ui/core'
import { DataGrid, ColDef, RowsProp } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/core/styles'

import ClientCard from './ClientCard'

import ClientsService from '../../services/ClientsService';
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
        marginBottom: theme.spacing(3),

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



const Clients = (props: IClientsProps) => {
    const [userClients, setUserClients] = useState<IClient[]>([])

    const classes = useStyles()
    const user = props.user;
    const clients = props.clients;
    

    useEffect(() => {
        if (user && user !== undefined && clients && clients !== undefined) {
            const timer = setTimeout(() => {
                setUserClients(clients.filter((c: any) => {
                    return c.manager === user.pk
                }));
            }, 1000)
            return () => clearTimeout(timer);
        }
    }, [user, clients])


    return (
        <div className={classes.wrapper}>
            <Paper elevation={3}>
                <div className={classes.topPanel}>
                    <span className={classes.tableHeader}>Клиенты</span>
                    <Button variant="contained" color="primary">Добавить</Button>
                </div>
            </Paper>

            <Paper elevation={3}>
                { userClients && userClients !== undefined
                    ? userClients.map((client: any) => <ClientCard client={client} />)
                    : null }
            </Paper> 
    {
        /*
                <div className={classes.tableWrapper}>
                    <DataGrid autoHeight={true} columns={columns} rows={clients} hideFooter={true} />
                </div>
        */
    }
        </div>
    )
}

export default Clients;