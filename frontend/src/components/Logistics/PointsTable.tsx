import React from 'react'
import DriverCellButton from './DriverCellButtons'

import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { IPointsProps } from '../../interfaces/LosisticsInterfaces'

import { YMaps, Map, Placemark } from 'react-yandex-maps'

const useStyles = makeStyles((theme: Theme) => ({
    mapWrapper: {
        padding: theme.spacing()
    }
}))


const PointsTable = (props: IPointsProps) => {
    const classes = useStyles()

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align={"center"}> <span>#</span> </TableCell>
                        <TableCell align={"center"}> <span>Клиент</span> </TableCell>
                        <TableCell align={"center"}> <span>Адрес</span> </TableCell>
                        <TableCell align={"center"}> <span>Задача</span> </TableCell>
                        <TableCell align={"center"}> <span>Водитель</span> </TableCell>
                        <TableCell align={"center"}> <span>Менеджер</span> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {props.points.map((point, index) => 
                    <TableRow key={point.pk} hover onClick={(e) => {
                        props.setEditablePoint(point)
                        
                    }}>
                        <TableCell align={"center"}> <span>{index + 1}</span></TableCell>
                        <TableCell align={"center"}> <span>{point.client.name}</span> </TableCell>
                        <TableCell align={"center"}>
                            <span>
                                {point.client.city}, {point.client.address}
                            </span> 
                        </TableCell>
                        <TableCell align={"center"}> <span>{point.description}</span> </TableCell>
                        <DriverCellButton user={props.user} point={point} />
                        <TableCell align={"center"}> <span>{point.manager}</span></TableCell>
                    </TableRow>)}                        
                </TableBody>
            </Table>

            <div className={classes.mapWrapper}>
                <YMaps>
                    <Map defaultState={{ center: [55.090011, 36.611163], zoom: 7}}>

                    </Map>
                </YMaps>
            </div>
            
            
            
            
        </div>

    )
}

export default PointsTable