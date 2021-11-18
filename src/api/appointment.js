import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/',
});

instance.interceptors.response.use((response) => {
  return response.data;
});

export default instance;
