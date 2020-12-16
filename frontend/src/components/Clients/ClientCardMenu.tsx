import React, { useState } from 'react'

import { IconButton, Menu, MenuItem, Divider } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'

import { ICommonClientProps } from '../../interfaces/ClientsInterfaces'

export const ClientCardMenu = (props: ICommonClientProps) => {
    const [anchor, setAnchor] = useState<HTMLElement | null>(null)
    const client = props.client;

    return (
        <div>
            <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
                <MoreVert />
            </IconButton>
            <Menu 
            anchorEl={anchor} 
            open={Boolean(anchor)} 
            onClose={(e) => setAnchor(null)}
            >

                <MenuItem onClick={(e) => {
                            props.setEditableClient(client);
                            setAnchor(null);
                        }}>Изменить
                </MenuItem>
                <Divider /> 
                <MenuItem onClick={(e) => props.deleteClient(e, client.pk)}>
                    Удалить
                </MenuItem>

            </Menu>
        </div>
    )
}