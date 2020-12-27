import React from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'
import PointCard from './PointCard'
import { IPoint, IPointsProps } from '../../interfaces/LosisticsInterfaces'

const useStyles = makeStyles((theme: Theme) => ({
    pointsList: {
        backgroundColor: '#f3f3f3',
        border: 'none'
    }
}))

const PointsList = (props: IPointsProps) => {
    const classes = useStyles()

    return(
        <div className={classes.pointsList}>
            {
                props.points.map((point: IPoint, index: number) => 
                    <PointCard point={point} index={index + 1}  user={props.user}/>
                )
            }
        </div>
    )
}

export default PointsList