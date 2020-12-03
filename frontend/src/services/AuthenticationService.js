import axios from 'axios'

const API_URL = 'http://192.168.1.31:8000/api'
const FRONTEND_SERVER = 'http://192.168.1.31:3000'
const TOKEN = localStorage.getItem('token')
const HEADERS = {
    "Authorization": `Bearer ${TOKEN}`,
    "Content-Type": 'application/json'
}

export default class Authentication {
    constructor() {
        this.authtorizeUser = this.authtorizeUser.bind(this)
    }

    async authtorizeUser(userData) {
        const url = `${API_URL}/token/`
        await axios.post(url, userData, {headers: {"Content-Type": "application/json"}})
          .then(response => response.data)
          .then(data => {
            localStorage.setItem('token', data.access);
            window.location.reload()
          })
    }

    checkToken() {
        return TOKEN ? true : false
    }

    async getUser() {
        const url = `${API_URL}/current-user/`
        const user = await axios.get(url, {headers: HEADERS}).then(res => res.data);
        return user;
    }   

    logout() {
        localStorage.removeItem('token');
        window.location.reload();
    }
}