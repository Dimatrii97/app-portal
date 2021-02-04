import server from './http'
export async function login({ login, password }) {
  const data = await server.post('api/login', { login, password })
  return data
}
