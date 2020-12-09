import React, { Fragment } from 'react'
import { IDriverCellProps } from '../../interfaces/LosisticsInterfaces'
import { TableCell, IconButton } from '@material-ui/core' 
import { Cancel, CheckCircle } from '@material-ui/icons'

import LogisticsService from '../../services/LogisticsService'
const logisticService = new LogisticsService()


const DriverCell = (props: IDriverCellProps) => {
    const point = props.point
    const driver = point.driver;
    const user = props.user

    const setDriver = (e: React.MouseEvent, point: number, driver: number) => {
        logisticService.updatePoint(point, {driver: driver})
        window.location.reload()
    }

    const removeDriver = (e: React.MouseEvent, point: number) => {
        logisticService.updatePoint(point, {driver: ''})
        window.location.reload()
    }

    let icon;
    if (user.position === 'Водитель' && driver && user.name === driver) {
        icon = <Fragment> <span>{driver}</span> <IconButton onClick={(e) => removeDriver(e, point.pk)}> <Cancel /> </IconButton> </Fragment> 
    }
    else if (user.position === 'Водитель' && !driver){
        icon = <IconButton onClick={(e) => setDriver(e, point.pk, user.pk)}> <CheckCircle /> </IconButton> 
    } 

    return (
        <TableCell align="center">
            {
                icon 
                ? icon 
                : <span>{driver}</span> 
            }
        </TableCell>
    )
}

export default DriverCell