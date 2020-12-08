import React, { useEffect } from 'react'

import { DataGrid, ColDef } from '@material-ui/data-grid'
import { IPoint, IPointsGridProps } from '../../interfaces/LosisticsInterfaces'

const columns: ColDef[] = [
    { field: 'id', headerName: '#', width: 70},
    { field: 'client', headerName: 'Клиент', width: 150 },
    { field: 'address', headerName: 'Адрес', flex: 1 },
    { field: 'description', headerName: 'Цель', flex: 1},
    { field: 'driver', headerName: 'Водитель', flex: .7 },
    { field: 'manager', headerName: 'Менеджер', flex: .7 }
]

const rows: any[] = []

const makeRowsData = (points: IPoint[]) => {
    points.map((point, index) => {
        const client = point.client;
        rows.push({
            id: index + 1,
            client: client.name,
            address: `${client.city}, ${client.street}, ${client.building}`,
            description: point.description,
            driver: point.driver,
            manager: point.manager
        })
    })
}

const row = [
    {id: 1, client: 'рус', address: 'ebalo', description: 'sos', driver: 'yaitsa', manager: 'lalk'}
]

const PointsGrid = (props: IPointsGridProps) => {

    useEffect(() => {
        makeRowsData(props.points);
        console.log(rows)
    }, [])

    return (
        <div style={{height: '400px', width: '100%'}}>
            <DataGrid columns={columns} rows={props.rows} showCellRightBorder={true} />
        </div>
    )

}

export default PointsGrid