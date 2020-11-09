interface IClient {
    id: number,
    name: string,
    address: string,
    phone_number: number,

}

interface IManager {
    pk: number,
    position: string,
    user: object,
    name: string
}

interface IDriver {
    pk: number,
    position: string,
    user: object,
    name: string
}

interface ITaskItem {
    pk: number,
    manager: IManager,
    driver: IDriver,
    task_date: string,
    description: string,
    client: IClient
}

export interface IEmployee {
    managers: Array<IManager>,
    drivers: Array<IDriver>
}

interface IClient {
    pk: number,
    name: string,
    address: string,
    phone_number: number
}

export interface IProps {

}

export interface IState {
    all_tasks: Array<ITaskItem>,
    current_tasks: Array<ITaskItem>,
    employees: IEmployee,
    clients: Array<IClient>,
    date: string,
    showModal: boolean,
    clientFormValue: string | null,
    managerFormValue: string | null,
    driverFormValue: string | null,
    dateFormValue: string | null,
    descriptionFormValue: string | null
}