import { IClient, IEmployee } from './CommonInterfaces' 

export interface IPoint {
    pk: number,
    date: string,
    description: string,
    manager: string,
    driver: string,
    client: IClient,
}

export interface IPointsProps {
    points: IPoint[],
    user: IEmployee
}

export interface IPointCardProps {
    point: IPoint,
    index: number
}

export interface ILogisticsProps {
    user: IEmployee,
    phoneScreen: boolean
    
}

export interface IDriverCellProps {
    point: IPoint,
    user: IEmployee
}
