import React from 'react'

import { IconButton } from '@material-ui/core'
import { Cancel, CheckCircle } from '@material-ui/icons'

import { IDriverButtonsProps } from '../../interfaces/LosisticsInterfaces'
import LogisticsService from '../../services/LogisticsService'
const logisticsService = new LogisticsService()

const DriverCardButton = (props: IDriverButtonsProps) => {
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

    let button
    if (user?.position === 'Водитель' && driver && user?.name === driver) {
        button =  <IconButton onClick={(e) => removeDriver(e, point.pk)}> <Cancel /> </IconButton> 
    }
    else if (user?.position === 'Водитель' && !driver){
        button = <IconButton onClick={(e) => setDriver(e, point.pk, user.pk)}> <CheckCircle /> </IconButton> 
    } else button = null 
    
    return button
}

export default DriverCardButton