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
    },
    clientsWrapper: {
        display: 'grid',
        gridTemplate: 'auto / repeat(5, 1fr)'

    }
}))



const Clients = (props: IClientsProps) => {
    const [userClients, setUserClients] = useState<IClient[]>([])
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [editableClient, setEditableClient] = useState<IClient>()
    const [showEditModal, setShowEditModal] = useState(false)

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
        if (editableClient) setShowCreateModal(true);
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
                    <span className={classes.tableHeader}>Клиенты</span>
                    <Button 
                    variant="contained" 
                    color="primary"
                    onClick={(e) => setShowCreateModal(true)}>Добавить</Button>
                </div>
            </Paper>

            <Paper elevation={3} className={classes.clientsWrapper}>
                { userClients && userClients !== undefined
                    ? userClients.map((client: any) => 
                    <ClientCard 
                        client={client} 
                        deleteClient={handleDeleteClient} 
                        showCreateModal={showCreateModal}
                        closeCreateModal={() => setShowCreateModal(false)} 
                        setEditableClient={setEditableClient}/>)
                    : null }
            </Paper>

            <ClientModal 
                user={user}
                client={editableClient ? editableClient : null} 
                showCreateModal={showCreateModal} 
                closeCreateModal={() => setShowCreateModal(false)}
                createClient={handleCreateClient}
                updateClient={handleUpdateClient}
            />

        </div>
    )
}

export default Clients;