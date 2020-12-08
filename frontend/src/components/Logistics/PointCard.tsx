import React from 'react'

import { makeStyles } from "@material-ui/core/styles"

import { IPointCardProps } from '../../interfaces/LosisticsInterfaces'

import { 
    Card, 
    CardActions, 
    CardContent, 
    Typography,
    IconButton 
} from '@material-ui/core'

const useStyles = makeStyles((theme: any) => ({
    cardWrapper: {
        padding: theme.spacing(2)
    }
}))

const PointCard = (props: IPointCardProps) => {

    const point = props.point
    const client = point.client
    const classes = useStyles()
    return (
        <div className={classes.cardWrapper}>
            <Card>
                <CardContent>
                    <Typography>{ props.index }</Typography>

                    <Typography>{ client.name }</Typography>
                </CardContent>
                <CardActions>

                </CardActions>
            </Card>
        </div>
    )
}

export default PointCard