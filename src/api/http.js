import axios from 'axios'
// import * as Token from '@/utils/token'
const instance = axios.create({
  baseURL: 'http://localhost:5000/',
  withCredentials: true
})
export default instance
