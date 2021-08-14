import axios from 'axios'
import * as Token from '@/utils/token'
const instance = axios.create({
  baseURL: 'http://localhost:5000/',
  withCredentials: true
})
instance.interceptors.request.use(request => {
  let accessToken = Token.getAccessToken()
  if (accessToken !== null) {
    request.headers.Authorization = `Bearer ${accessToken}`
  }

  return request
})

export default instance
