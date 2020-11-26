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
    phone_number: number
    manager: number
}