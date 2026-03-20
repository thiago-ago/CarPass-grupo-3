import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gerenciamento-manutencoes-production.up.railway.app/v1' 
});

export default api;