import React, { useState, useEffect } from 'react'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles'
import { Paper, Button } from '@material-ui/core'

import CommonDatePicker from '../Common/CommonDatePicker'
import LogisticsModal from './LogisticsModal'
import PointsTable from './PointsTable'
import PointsList from './PointsList'

import { ILogisticsProps, IPoint } from '../../interfaces/LosisticsInterfaces'
import LogisticsService from '../../services/LogisticsService'
import ClientsService from '../../services/ClientsService'
const logisticsService = new LogisticsService()
const clientsService = new ClientsService()


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

        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column'
        }
    },
    panelHeader: {
        fontWeight: 700,
        fontSize: '1.5rem',
        marginLeft: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',

        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
            margin: '1rem 0'
            
        }
    },
    panelRight: {
        display: 'flex',
        justifyContent: 'flex-end',

        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
        }
    },

    addButton: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        '& button': {
            margin: theme.spacing(3),
            height: '40%',

            [theme.breakpoints.down('sm')]: {
                margin: theme.spacing(2)
            }
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '.8rem',
        },

    },
    pointsWrapper: {
        display: 'grid',
        gridTemplate: 'auto / repeat(auto-fit, minmax(200px, 1fr))'
    }


}))
   

const Logistics = (props: ILogisticsProps) => {
    const [points, setPoints] = useState([])
    const [currentPoints, setCurrentPoints] = useState([])
    const [clients, setClients] = useState([])
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"))
    const [showModal, setShowModal] = useState(false)
    const [editablePoint, setEditablePoint] = useState<IPoint>()
    const classes = useStyles();

    useEffect(() => {
        logisticsService.getPoints()
            .then((points: any) => {
                setPoints(points);
                setCurrentPoints(points.filter((point: IPoint) => {
                    return moment(point.date).format("YYYY-MM-DD") === date
                }));
            })
        clientsService.getClients()
            .then((clients: any) => setClients(clients))
    }, [])

    useEffect(() => {
        setCurrentPoints(points.filter((point: IPoint) => {
            return moment(point.date).format("YYYY-MM-DD") === date
        }))
    }, [date])

    useEffect(() => {
        if (editablePoint) setShowModal(true)
    }, [editablePoint])

    const handleCreatePoint = (e: React.MouseEvent, data: {}) => {
        logisticsService.createPoint(data)
        .then(() => window.location.reload())
        .catch(() => alert("Произошла ошибка"))
    }

    const handleUpdatePoint = (e: React.MouseEvent, pk: number | null, data: {}) => {
        logisticsService.updatePoint(pk, data)
        .then(() => window.location.reload())
        .catch(() => alert("Произошла ошибка"))
    }

    const handleDeletePoint = (e: React.MouseEvent, pk: number | null) => {
        logisticsService.deletePoint(pk)
        .then(() => {
            const updatedPoints = points.filter((point: IPoint) => {
                return point.pk !== pk
            })
            setPoints(updatedPoints)
        })
        .catch(() => alert("Произошла ошибка!"))
    }

    return (
        <div className={classes.wrapper}>
            <Paper elevation={3}>
                <div className={classes.topPanel}>
                    <span className={classes.panelHeader}>Логистика</span>
                    <div className={classes.panelRight}>
                        <CommonDatePicker date={date} setDate={setDate}/>
                        <div className={classes.addButton}>
                            <Button 
                            variant="contained" 
                            color="primary"
                            onClick={() => setShowModal(true)}>Добавить точку</Button>
                        </div>
                    </div>
                </div>
            </Paper>

            <Paper elevation={3}>
                {
                    props.phoneScreen
                    ? <PointsList
                      points={currentPoints} 
                      setEditablePoint={setEditablePoint} 
                      user={props.user}
                      />
                    : <PointsTable 
                      points={currentPoints} 
                      setEditablePoint={setEditablePoint} 
                      user={props.user}/>
                }
            </Paper>
            
            <LogisticsModal 
            user={props.user}
            clients={clients}
            point={editablePoint ? editablePoint : null}
            showModal={showModal} 
            closeModal={() => { setShowModal(false); setEditablePoint(undefined)}}
            createPoint={handleCreatePoint}
            updatePoint={handleUpdatePoint}
            deletePoint={handleDeletePoint}
            />
        </div>
    )
}

export default Logistics