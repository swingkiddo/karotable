import { IEmployee, IClient } from './CommonInterfaces'

export interface ITaskItem {
    pk: number,
    manager: IEmployee,
    date: string,
    description: string,
    client: IClient
}

export interface ITasksProps {
    currentUser: IEmployee,
    clients: IClient[]
}

export interface ITasksTableProps{
    tasks: ITaskItem[],
    clients: IClient[],
    currentUser: IEmployee,
}

export interface ITasksModalProps {
    isOpen: boolean,
    onRequestClose(): any,
    clients: IClient[],
    currentUser: IEmployee
}
