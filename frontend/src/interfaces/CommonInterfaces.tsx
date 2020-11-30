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
    phone: number,
    manager: number
}