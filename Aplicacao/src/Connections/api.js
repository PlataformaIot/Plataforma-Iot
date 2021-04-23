import axios from 'axios';

const api = axios.create({
    //baseURL:'http://localhost:3333/'
    baseURL:'http://161.97.133.47:8000/'
})

export default api;