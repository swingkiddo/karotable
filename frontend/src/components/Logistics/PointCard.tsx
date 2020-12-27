import React from 'react'
import DriverCardButton from './DriverCardButtons'
import { IPointCardProps } from '../../interfaces/LosisticsInterfaces'

import { makeStyles } from "@material-ui/core/styles"
import { 
    Card, 
    CardActions, 
    CardContent, 
    Typography,
    IconButton 
} from '@material-ui/core'

import { YMaps, Map, Placemark } from 'react-yandex-maps'



const useStyles = makeStyles((theme: any) => ({
    cardWrapper: {
        textAlign: 'center',
        marginBottom: theme.spacing(2)
    },
    cardIndex: {
        backgroundColor: 'rgba(0, 0, 0, .8)',
        borderRadius: '2px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        '& span': {
            color: 'white',
            opacity: '1'
        }
    },
    clientName: {
        marginBottom: theme.spacing(1),
        '& span': {
            fontSize: '1.5rem'
        }
    },
    clientAddress: {
        '& span': {
            fontSize: '1.2rem'
        }
    },
    pointInfo: {
        textAlign: 'left',
        '& h3': {
            marginBottom: '0'
        }
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    mapWrapper: {
        marginTop: theme.spacing(2)
    }

}))

const PointCard = (props: IPointCardProps) => {

    const point = props.point
    const client = point.client
    const classes = useStyles()

    let coords: number[] = client.coordinates.split(',').map(coord => Number(coord.trim()))
    
    return (
            <Card className={classes.cardWrapper}>
                <CardContent>

                    <Typography className={classes.cardIndex}>
                        <div>
                            <span>{ props.index }</span>
                        </div>
                    </Typography>

                    <Typography className={classes.clientName}>
                        <span><b>{ client.name }</b></span>
                    </Typography>

                    <Typography className={classes.clientAddress}>
                        <span>{ client.city}, {client.address }</span>
                        <p></p>
                    </Typography>

                    <Typography className={classes.pointInfo}>
                        <h3>Задача: </h3>
                        <span>{ point.description }</span>
                    </Typography>

                    <Typography className={classes.pointInfo}> 
                        <h3>Менеджер:</h3> 
                        <span>{ point.manager }</span>
                    </Typography>

                    {
                        point.driver
                        ? <Typography className={classes.pointInfo}>
                            <h3>Водитель:</h3>
                            <span>{ point.driver }</span>
                        </Typography>
                        : null
                    }

                    <YMaps>
                        <div className={classes.mapWrapper}>
                            <Map 
                            defaultState={{
                                center: coords,
                                zoom: 11
                            }}
                            width={'100%'}
                            >
                                <Placemark geometry={coords} />
                            </Map>
                        </div>
                    </YMaps>

                </CardContent>
                <CardActions className={classes.buttons}>
                    <DriverCardButton user={props.user} point={point}/>
                </CardActions>
            </Card>

    )
}

export default PointCard