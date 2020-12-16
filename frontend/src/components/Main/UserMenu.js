import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconButton, Menu, MenuItem, Divider, useMediaQuery } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
import Authentication from '../../services/AuthenticationService'

const authentication = new Authentication();

const UserMenu = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const phone = useMediaQuery('(max-width:600px)')

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            {phone
                ?
                    <div>
                        <IconButton 
                        aria-controls="user-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu 
                        id="user-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        >
                            <MenuItem>
                                <Link to='/production'>Производство</Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to='/logistics'>Логистика</Link>
                            </MenuItem>
                            <MenuItem onClick={(e) => handleClose()}>
                                <Link to='/clients'>Клиенты</Link>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={authentication.logout}>Выйти</MenuItem>
                        </Menu>
                    </div>
                :
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
                            <MenuItem onClick={(e) => handleClose()}>
                                <Link to='/clients'>Клиенты</Link>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={authentication.logout}>Выйти</MenuItem>
                        </Menu>
                    </div>
            }
        </div>
    )
}

export default UserMenu