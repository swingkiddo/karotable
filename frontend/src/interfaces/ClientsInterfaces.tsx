import { IEmployee, IClient } from './CommonInterfaces' 

export interface IClientsProps {
    user: IEmployee,
    clients: IClient[]
}

export interface ICommonClientProps {
    client: IClient,
    deleteClient(e: React.MouseEvent, pk: number): void,
    showCreateModal: boolean,
    closeCreateModal(): void,
    setEditableClient: (editableClient: IClient) => void
}

export interface IClientModalProps {
    user: IEmployee,
    client: IClient | null,
    showCreateModal: boolean,
    closeCreateModal(): void,
    createClient(e: React.MouseEvent, data: {}): void,
    updateClient(e: React.MouseEvent, pk: number, client: {}): void
} 