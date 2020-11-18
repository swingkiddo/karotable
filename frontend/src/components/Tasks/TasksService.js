import axios from 'axios'

const API_URL = 'http://localhost:8000/api';
const JWT_TOKEN = localStorage.getItem('token')
const HEADERS = {
    "Authorization": `Bearer ${JWT_TOKEN}`,
    "Content-Type": "application/json" }

export default class TasksService {
    getTasks() {
        const url = `${API_URL}/tasks/`;
        return axios.get(url, {headers: HEADERS}).then(response => response.data);
    }

    createTask(task) {
        const url = `${API_URL}/tasks/`;
        return axios.post(url, task, {headers: HEADERS});
    }

    updateTask(task) {
        const url = `${API_URL}/tasks/${task.pk}`;
        return axios.patch(url, task, {headers: HEADERS});
    }

    deleteTask(task) {
        const url = `${API_URL}/tasks/${task.pk}`;
        return axios.delete(url, {headers: HEADERS});
    }

    getEmployees() {
        const url = `${API_URL}/employees/`;
        return axios.get(url, {headers: HEADERS}).then(response => response.data)
    }

    getClients() {
        const url = `${API_URL}/clients/`;
        return axios.get(url, {headers: HEADERS}).then(response => response.data)
    }
}