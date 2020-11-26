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

export interface ITasksState {
    all_tasks: Array<ITaskItem>,
    current_tasks: Array<ITaskItem>,
    currentUser: IEmployee,
    clients: Array<IClient>,
    date: string,
    showModal: boolean,
    clientFormValue: string | null,
    dateFormValue: string | null,
    descriptionFormValue: string | null
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
