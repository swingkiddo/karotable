import axios from 'axios'

const API_URL = 'http://localhost:8000/api';

export default class TasksService {
    getTasks() {
        const url = `${API_URL}/tasks/`;
        return axios.get(url).then(response => response.data);
    }

    createTask(task) {
        const url = `${API_URL}/tasks/`;
        return axios.post(url, task, {"content-type": "application/json"});
    }

    updateTask(task) {
        const url = `${API_URL}/tasks/${task.pk}`;
        return axios.patch(url, task, {"content-type": "application/json"});
    }

    deleteTask(task) {
        const url = `${API_URL}/tasks/${task.pk}`;
        return axios.delete(url);
    }

    getEmployees() {
        const url = `${API_URL}/employees/`;
        return axios.get(url).then(response => response.data)
    }

    getClients() {
        const url = `${API_URL}/clients/`;
        return axios.get(url).then(response => response.data)
    }
}