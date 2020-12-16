import React, { useState, useEffect } from 'react'
import { IClientsProps } from '../../interfaces/ClientsInterfaces'
import { IClient } from '../../interfaces/CommonInterfaces'

import { Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import ClientCard from './ClientCard'
import { ClientModal } from './ClientModal'

import ClientsService from '../../services/ClientsService'
const clientsService = new ClientsService();


const useStyles = makeStyles((theme: any) => ({
    wrapper: {
        padding: '0 2rem',
        fontFamily: 'Montserrat, sans-serif'
    },
    topPanel: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(3),

        "& button": {
            margin: theme.spacing(3),
            [theme.breakpoints.down('sm')]: {
                fontSize: '.7rem'
            }
        }
    },
    tableWrapper: {
        height: '20rem'
    },
    panelHeader: {
        marginLeft: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        fontWeight: 700,
        fontSize: '1.5rem'
    },
    clientsWrapper: {
        display: 'grid',
        gridTemplate: 'auto / repeat(auto-fit, minmax(200px, 1fr))' 
    }
}))



const Clients = (props: IClientsProps) => {
    const [userClients, setUserClients] = useState<IClient[]>([])
    const [showModal, setShowModal] = useState(false)
    const [editableClient, setEditableClient] = useState<IClient>()

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

    useEffect(() => {
        if (editableClient) setShowModal(true);
    }, [editableClient])

    const handleDeleteClient = (e: React.MouseEvent, pk: number) => {
        clientsService.deleteClient(pk)
        .then(() => {
            const updatedClients = userClients.filter((client) => {
                return client.pk !== pk
            })
            setUserClients(updatedClients)
        })
        .catch(() => alert("Произошла ошибка"))
    }

    const handleCreateClient = (e: React.MouseEvent, client: {}) => {
        clientsService.createClient(client)
        .then(() => window.location.reload())
        .catch(() => alert("Произошла ошибка"))
    }

    const handleUpdateClient = (e: React.MouseEvent, pk: number | null, client: {}) => {
        clientsService.updateClient(pk, client)
        .then(() => window.location.reload())
        .catch(() => alert("Произошла ошибка"))
    }

    return (
        <div className={classes.wrapper}>

            <Paper elevation={3}>
                <div className={classes.topPanel}>
                    <span className={classes.panelHeader}>Клиенты</span>
                    <Button 
                    variant="contained" 
                    color="primary"
                    onClick={(e) => setShowModal(true)}>Добавить</Button>
                </div>
            </Paper>

            <Paper elevation={3} className={classes.clientsWrapper}>
                { userClients && userClients !== undefined
                    ? userClients.map((client: any) => 
                        <ClientCard 
                        client={client} 
                        deleteClient={handleDeleteClient} 
                        setEditableClient={setEditableClient}/>)
                    : null }
            </Paper>

            <ClientModal 
            user={user}
            client={editableClient ? editableClient : null} 
            showModal={showModal} 
            closeModal={() => setShowModal(false)}
            createClient={handleCreateClient}
            updateClient={handleUpdateClient}
            />

        </div>
    )
}

export default Clients;