import React, { useState } from 'react'

import { IconButton, Menu, MenuItem, Divider } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'

import { ICommonClientProps } from '../../interfaces/ClientsInterfaces'
import ClientsService from '../../services/ClientsService'
const clientsService = new ClientsService();

export const ClientCardMenu = (props: ICommonClientProps) => {
    const [anchor, setAnchor] = useState<HTMLElement | null>(null)
    const client = props.client;

    const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
        setAnchor(e.currentTarget)
    }

    const handleClose = () => {
        setAnchor(null)
    }

    return (
        <div>
            <IconButton onClick={handleOpen}>
                <MoreVert />
            </IconButton>
            <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={handleClose}>
                <MenuItem onClick={(e) => {
                    props.setEditableClient(client);
                    handleClose()
                }}>Изменить</MenuItem>
                <Divider /> 
                <MenuItem onClick={(e) => props.deleteClient(e, client.pk)}>Удалить</MenuItem>
            </Menu>
        </div>
    )
}