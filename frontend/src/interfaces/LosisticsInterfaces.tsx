import { IClient, IEmployee } from './CommonInterfaces' 

export interface IPoint {
    pk: number,
    date: string,
    description: string,
    manager: IEmployee,
    driver: IEmployee,
    client: IClient,
}

export interface IPointCardProps {
    point: IPoint,
    index: number
}

export interface IPointsGridProps {
    points: IPoint[],
    rows: any[]
}

export interface ILogisticsProps {
    user: IEmployee,
    
}
