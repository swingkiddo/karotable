import { IEmployee, IClient } from './CommonInterfaces' 

export interface IClientsProps {
    user: IEmployee,
    clients: IClient[]
}

export interface IClientCardProps {
    client: IClient
}