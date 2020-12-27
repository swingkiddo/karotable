import axios from 'axios'

const API_URL = 'http://192.168.1.253:8000/api'
const JWT_TOKEN = localStorage.getItem('token')
const HEADERS = {
    "Authorization": `Bearer ${JWT_TOKEN}`,
    "Content-Type": "application/json" }

export default class ClientsService {
    async getClients() {
        const url = `${API_URL}/clients/`;
        const clients = await axios.get(url, {headers: HEADERS}).then(response => response.data);
        return clients;
    }

    getClient(pk) {
        const url = `${API_URL}/clients/${pk}/`;
        return axios.get(url, {headers: HEADERS}).then(response => response.data)
    }

    createClient(client) {
        const url = `${API_URL}/clients/`;
        return axios.post(url, client, {headers: HEADERS});
    }

    updateClient(pk, data) {
        const url = `${API_URL}/clients/${pk}/`;
        return axios.patch(url, data, {headers: HEADERS});
    }
    
    deleteClient(pk) {
        const url = `${API_URL}/clients/${pk}/`;
        return axios.delete(url, {headers: HEADERS})
    }
}