import { IEmployee, IClient } from './CommonInterfaces' 

export interface IClientsProps {
    user: IEmployee,
    clients: IClient[]
}

export interface ICommonClientProps {
    client: IClient,
    deleteClient(e: React.MouseEvent, pk: number): void,
    setEditableClient: (editableClient: IClient) => void
}

export interface IClientModalProps {
    user: IEmployee,
    client: IClient | null,
    showModal: boolean,
    closeModal(): void,
    createClient(e: React.MouseEvent, data: {}): void,
    updateClient(e: React.MouseEvent, pk: number, client: {}): void
} 