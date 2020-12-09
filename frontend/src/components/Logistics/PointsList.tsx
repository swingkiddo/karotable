import React from 'react'

import PointCard from './PointCard'
import { IPoint, IPointsProps } from '../../interfaces/LosisticsInterfaces'

const PointsList = (props: IPointsProps) => {

    return(
        <div>
            {
                props.points.map((point: IPoint, index: number) => 
                    <PointCard point={point} index={index + 1} />
                )
            }
        </div>
    )
}

export default PointsList