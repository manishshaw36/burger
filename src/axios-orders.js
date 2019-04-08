import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-36.firebaseio.com/'
})

export default instance;