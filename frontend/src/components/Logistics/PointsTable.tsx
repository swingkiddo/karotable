import React from 'react'
import DriverCell from './DriverCell'

import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'
import { IPointsProps } from '../../interfaces/LosisticsInterfaces'


const PointsTable = (props: IPointsProps) => {

    return (
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
                <TableRow key={point.pk} hover>
                    <TableCell align={"center"}> <span>{index + 1}</span></TableCell>
                    <TableCell align={"center"}> <span>{point.client.name}</span> </TableCell>
                    <TableCell align={"center"}>
                        <span>
                            {point.client.city}, {point.client.address}
                        </span> 
                    </TableCell>
                    <TableCell align={"center"}> <span>{point.description}</span> </TableCell>
                    <DriverCell user={props.user} point={point} />
                    <TableCell align={"center"}> <span>{point.manager}</span></TableCell>
                </TableRow>)}                        
            </TableBody>
        </Table>
    )
}

export default PointsTable