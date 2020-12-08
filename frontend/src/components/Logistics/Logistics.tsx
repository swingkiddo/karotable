import React, { useState, useEffect } from 'react'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles'
import { Paper, Button } from '@material-ui/core'

import { DataGrid, ColDef } from '@material-ui/data-grid'

import CommonDatePicker from '../Common/CommonDatePicker'
import PointsGrid from './PointsGrid'
import PointCard from './PointCard'
import { ILogisticsProps, IPoint } from '../../interfaces/LosisticsInterfaces'
import LogisticsService from '../../services/LogisticsService'
const logisticsService = new LogisticsService()


const useStyles = makeStyles((theme: any) => ({
    wrapper: {
        padding: '0 2rem',
        fontFamily: 'Montserrat, sans-serif'
    },
    topPanel: {
        width: '100%',
        display: 'grid',
        gridTemplate: '1fr / 1fr 1fr',
        marginBottom: theme.spacing(3),

        "& button": {
            margin: theme.spacing(3),
            [theme.breakpoints.down('sm')]: {
                fontSize: '.7rem'
            }
        }
    },
    panelHeader: {
        fontWeight: 700,
        fontSize: '1.5rem',
        marginLeft: theme.spacing(3),
        display: 'flex',
        alignItems: 'center'
    },
    panelRight: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    addButton: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        '& button': {
            height: '40%'
        }
    },
    pointsWrapper: {
        display: 'grid',
        gridTemplate: 'auto / repeat(auto-fit, minmax(200px, 1fr))'
    }


}))

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


const Logistics = (props: ILogisticsProps) => {
    const [points, setPoints] = useState([])
    const [currentPoints, setCurrentPoints] = useState([])
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"))

    const classes = useStyles();

    useEffect(() => {
        logisticsService.getPoints()
            .then((points: any) => {
                setPoints(points);
                setCurrentPoints(points.filter((point: IPoint) => {
                    return moment(point.date).format("YYYY-MM-DD") === date
                }));
                makeRowsData(points);
            })
    }, [])

    useEffect(() => {
        setCurrentPoints(points.filter((point: IPoint) => {
            return moment(point.date).format("YYYY-MM-DD") === date
        }))
    }, [date])

    return (
        <div className={classes.wrapper}>
            <Paper elevation={3}>
                <div className={classes.topPanel}>
                    <span className={classes.panelHeader}>Логистика</span>
                    <div className={classes.panelRight}>
                        <CommonDatePicker date={date} setDate={setDate}/>
                        <div className={classes.addButton}>
                            <Button variant="contained" color="primary">Добавить</Button>
                        </div>
                    </div>
                </div>
            </Paper>

                <PointsGrid points={currentPoints} rows={rows}/>
        </div>
    )
}

export default Logistics