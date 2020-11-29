import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconButton, Menu, MenuItem, Divider } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'

const UserMenu = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        localStorage.removeItem('token');
    }

    return (
        <div>
            <IconButton 
                aria-controls="user-menu"
                aria-haspopup="true"
                onClick={handleClick}>
                <MenuIcon />
            </IconButton>
            <Menu 
                id="user-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={(e) => handleClose()}><Link to='/clients'>Клиенты</Link></MenuItem>
                <Divider />
                <MenuItem onClick={logout}>Выйти</MenuItem>
            </Menu>
        </div>
    )
}

export default UserMenu