import server from './http'
export async function login({ login, password }) {
  const data = await server.post('api/login', { login, password })
  return data
}
export async function user() {
  const data = await server.get('/api/user')
  return data
}
export async function usersDepartment() {
  const data = await server.post('/api/users')
  return data
}
