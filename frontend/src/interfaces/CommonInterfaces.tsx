export interface IEmployee {
    pk: number,
    position: string,
    name: string,
    clients: Array<IClient>
}

export interface IClient {
    pk: number,
    name: string,
    address: string,
    city: string,
    street: string,
    building: string,
    phone: string,
    manager: number,
    email: string,
    coordinates: string,
}

export interface IDatePickerProps {
    date: string,
    setDate(date: string): void
}

export interface IContentProps {
    user: IEmployee,
    clients: IClient[],
    phoneScreen: boolean
}