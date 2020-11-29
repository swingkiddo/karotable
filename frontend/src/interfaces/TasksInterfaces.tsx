import { IEmployee, IClient } from './CommonInterfaces'

export interface ITaskItem {
    pk: number,
    manager: IEmployee,
    date: string,
    description: string,
    client: IClient
}

export interface ITasksProps {
    currentUser: IEmployee
}

export interface ITasksTableProps{
    tasks: Array<ITaskItem>,
    clients: Array<IClient>,
    currentUser: IEmployee,
}

export interface ITasksModalProps {
    isOpen: boolean,
    onRequestClose(): any,
    clients: Array<IClient>,
    currentUser: IEmployee
}
