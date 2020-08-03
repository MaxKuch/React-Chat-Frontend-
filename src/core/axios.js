import axios from 'axios'
import config from '../configs'

const instance = axios.create({
  baseURL: `${config.development.API_URL}:${config.development.API_PORT}`
});

export default instance