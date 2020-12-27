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
    user: IEmployee,
    setEditablePoint: (editablePoint: IPoint) => void
}

export interface IPointCardProps {
    point: IPoint,
    index: number,
    user: IEmployee
}

export interface ILogisticsProps {
    user: IEmployee,
    clients: IClient[],
    phoneScreen: boolean
    
}

export interface ILogisticsModalProps {
    user: IEmployee,
    point: IPoint | null,
    clients: IClient[],
    showModal: boolean,
    closeModal(): void,
    createPoint(e: React.MouseEvent, data: {}): void,
    updatePoint(e: React.MouseEvent, pk: number, data: {}): void,
    deletePoint(e: React.MouseEvent, pk: number): void
}

export interface IDriverButtonsProps {
    point: IPoint,
    user: IEmployee
}
