import axios from 'axios';

const api = axios.create({
    //baseURL:'http://localhost:3333/'
    baseURL:'http://locolhost:8000/'
})

export default api;