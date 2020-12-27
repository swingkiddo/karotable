import axios from 'axios'

const API_URL = 'http://192.168.1.253:8000/api'
const JWT_TOKEN = localStorage.getItem('token')
const HEADERS = {
    "Authorization": `Bearer ${JWT_TOKEN}`,
    "Content-Type": "application/json" 
}

export default class LogisticsService {
    
    async getPoints() {
        const url = `${API_URL}/points/`
        const points = await axios.get(url, {headers: HEADERS})
            .then(response => response.data)
        return points
    }   
    
    createPoint(data) {
        const url = `${API_URL}/points/`
        return axios.post(url, data, {headers: HEADERS})
    }

    updatePoint(pk, data) {
        const url = `${API_URL}/points/${pk}/`
        return axios.patch(url, data, {headers: HEADERS})
    }
    
    deletePoint(pk) {
        const url = `${API_URL}/points/${pk}/`
        return axios.delete(url, {headers: HEADERS})
    }

}