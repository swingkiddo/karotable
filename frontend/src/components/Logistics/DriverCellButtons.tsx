import React, { Fragment } from 'react'
import { IDriverButtonsProps } from '../../interfaces/LosisticsInterfaces'
import { TableCell, IconButton } from '@material-ui/core' 
import { Cancel, CheckCircle } from '@material-ui/icons'

import LogisticsService from '../../services/LogisticsService'
const logisticsService = new LogisticsService()


const DriverCellButton = (props: IDriverButtonsProps) => {
    const point = props.point
    const driver = point.driver;
    const user = props.user

    const setDriver = (e: React.MouseEvent, point: number, driver: number) => {
        logisticsService.updatePoint(point, {driver: driver})
        window.location.reload()
    }

    const removeDriver = (e: React.MouseEvent, point: number) => {
        logisticsService.updatePoint(point, {driver: ''})
        window.location.reload()
    }


    /*  check the user position and name for rendering necessary button  
        1) if user is driver and his name similar with the name in point info then 
        remove driver button will be rendered
        2) if user is driver and point info doesn't have driver's name then 
        set driver button will be rendered
        3) if user is not driver then will be shown only driver's name without button or empty space
    */
    let button;
    if (user?.position === 'Водитель' && driver && user?.name === driver) {
        button = <Fragment> <span>{driver}</span> <IconButton onClick={(e) => removeDriver(e, point.pk)}> <Cancel /> </IconButton> </Fragment> 
    }
    else if (user?.position === 'Водитель' && !driver){
        button = <IconButton onClick={(e) => setDriver(e, point.pk, user.pk)}> <CheckCircle /> </IconButton> 
    } 

    return (
        <TableCell align="center">
            {
                button 
                ? button
                : <span>{driver}</span> 
            }
        </TableCell>
    )
}

export default DriverCellButton