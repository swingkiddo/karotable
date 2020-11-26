import React, { useState, useEffect } from 'react'
import { IClientsProps } from '../../interfaces/ClientsInterfaces'

import { makeStyles } from '@material-ui/core/styles'

import ClientsService from './ClientsService';

const clientsService = new ClientsService();

const Clients = (props: IClientsProps) => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        clientsService.getClients()
        .then(clients => setClients(clients.filter((c: any) => {
            return props.currentUser.clients.includes(c.pk)
        })));
    }, [])

    return (
        <div>

        </div>
    )
}

export default Clients;